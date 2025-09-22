import { type User, type InsertUser, type Track, type InsertTrack } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Track methods
  getTracks(): Promise<Track[]>;
  getTrack(id: string): Promise<Track | undefined>;
  createTrack(track: InsertTrack): Promise<Track>;
  updateTrack(id: string, track: Partial<Track>): Promise<Track | undefined>;
  deleteTrack(id: string): Promise<boolean>;
  searchTracks(query: string): Promise<Track[]>;
  filterTracksByStatus(status: string): Promise<Track[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tracks: Map<string, Track>;

  constructor() {
    this.users = new Map();
    this.tracks = new Map();
    
    // Initialize with some sample tracks for demo
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleTracks: Track[] = [
      {
        id: "1",
        title: "Midnight Dreams",
        artist: "Sarah Johnson",
        releaseDate: "2024-03-15",
        genre: "Pop",
        status: "released",
        description: "A captivating pop ballad exploring themes of love and hope.",
        duration: "3:24",
        streams: 125432,
        likes: 8234,
        shares: 1542,
        earnings: "234.56",
        createdAt: new Date("2024-03-01"),
      },
      {
        id: "2", 
        title: "Electric Vibes",
        artist: "DJ Mike Chen",
        releaseDate: "2024-02-28",
        genre: "Electronic",
        status: "pending",
        description: "High-energy electronic track with pulsating beats.",
        duration: "4:12",
        streams: 0,
        likes: 0,
        shares: 0,
        earnings: "0.00",
        createdAt: new Date("2024-02-20"),
      },
      {
        id: "3",
        title: "Summer Nights",
        artist: "The Wavelengths",
        releaseDate: "2024-04-02", 
        genre: "Alternative",
        status: "processing",
        description: "Indie rock anthem celebrating summer freedom.",
        duration: "3:45",
        streams: 0,
        likes: 0,
        shares: 0,
        earnings: "0.00",
        createdAt: new Date("2024-03-25"),
      }
    ];

    sampleTracks.forEach(track => this.tracks.set(track.id, track));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTracks(): Promise<Track[]> {
    return Array.from(this.tracks.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getTrack(id: string): Promise<Track | undefined> {
    return this.tracks.get(id);
  }

  async createTrack(insertTrack: InsertTrack): Promise<Track> {
    const id = randomUUID();
    const track: Track = {
      ...insertTrack,
      id,
      status: "pending",
      duration: "0:00",
      streams: 0,
      likes: 0,
      shares: 0,
      earnings: "0.00",
      createdAt: new Date(),
    };
    this.tracks.set(id, track);
    return track;
  }

  async updateTrack(id: string, updates: Partial<Track>): Promise<Track | undefined> {
    const track = this.tracks.get(id);
    if (!track) return undefined;
    
    const updatedTrack = { ...track, ...updates };
    this.tracks.set(id, updatedTrack);
    return updatedTrack;
  }

  async deleteTrack(id: string): Promise<boolean> {
    return this.tracks.delete(id);
  }

  async searchTracks(query: string): Promise<Track[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.tracks.values()).filter(track =>
      track.title.toLowerCase().includes(lowerQuery) ||
      track.artist.toLowerCase().includes(lowerQuery) ||
      track.genre.toLowerCase().includes(lowerQuery)
    );
  }

  async filterTracksByStatus(status: string): Promise<Track[]> {
    return Array.from(this.tracks.values()).filter(track =>
      track.status === status
    );
  }
}

export const storage = new MemStorage();
