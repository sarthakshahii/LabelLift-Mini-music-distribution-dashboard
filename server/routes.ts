import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTrackSchema, loginSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      // Mock authentication - accept any non-empty credentials
      if (username && password) {
        res.json({
          success: true,
          user: { id: "1", username, name: "John Doe" },
          message: "Login successful"
        });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Invalid request data" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.json({ success: true, message: "Logged out successfully" });
  });

  // Track routes
  app.get("/api/tracks", async (req, res) => {
    try {
      const { search, status } = req.query;
      
      let tracks = await storage.getTracks();
      
      if (search && typeof search === 'string') {
        tracks = await storage.searchTracks(search);
      }
      
      if (status && typeof status === 'string' && status !== '') {
        tracks = tracks.filter(track => track.status === status);
      }
      
      res.json(tracks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tracks" });
    }
  });

  app.get("/api/tracks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const track = await storage.getTrack(id);
      
      if (!track) {
        return res.status(404).json({ message: "Track not found" });
      }
      
      res.json(track);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch track" });
    }
  });

  app.post("/api/tracks", async (req, res) => {
    try {
      const trackData = insertTrackSchema.parse(req.body);
      const track = await storage.createTrack(trackData);
      res.status(201).json(track);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create track" });
    }
  });

  app.put("/api/tracks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const track = await storage.updateTrack(id, updates);
      
      if (!track) {
        return res.status(404).json({ message: "Track not found" });
      }
      
      res.json(track);
    } catch (error) {
      res.status(500).json({ message: "Failed to update track" });
    }
  });

  app.delete("/api/tracks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteTrack(id);
      
      if (!success) {
        return res.status(404).json({ message: "Track not found" });
      }
      
      res.json({ message: "Track deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete track" });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const tracks = await storage.getTracks();
      
      const stats = {
        totalTracks: tracks.length,
        releasedTracks: tracks.filter(t => t.status === 'released').length,
        pendingTracks: tracks.filter(t => t.status === 'pending').length,
        processingTracks: tracks.filter(t => t.status === 'processing').length,
        totalStreams: tracks.reduce((sum, t) => sum + (t.streams || 0), 0),
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
