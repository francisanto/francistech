import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (import.meta.env["VITE_SUPABASE_URL"] as string | undefined) ||
  (import.meta.env["NEXT_PUBLIC_SUPABASE_URL"] as string | undefined) ||
  "https://egqsslzwetpoqscywdsv.supabase.co";

const supabaseAnonKey =
  (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined) ||
  (import.meta.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] as string | undefined) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncXNzbHp3ZXRwb3FzY3l3ZHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzOTk4NTIsImV4cCI6MjA5ODk3NTg1Mn0.JpA6sKXvEHry_hX-vpzvtu-94e8HD6u6ucvgr2HlPuI";

export interface ReviewItem {
  id?: string | undefined;
  author: string;
  name?: string | undefined;
  email?: string | undefined;
  message: string;
  review?: string | undefined;
  created_at?: string | undefined;
}

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

interface RawReviewRow {
  id?: string;
  author?: string;
  name?: string;
  email?: string;
  message?: string;
  review?: string;
  created_at?: string;
}

export async function getReviews(): Promise<ReviewItem[]> {
  if (!supabase) {
    try {
      const local = localStorage.getItem("francis_portfolio_reviews");
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews from Supabase:", error);
    try {
      const local = localStorage.getItem("francis_portfolio_reviews");
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  }

  return ((data as RawReviewRow[]) || []).map((row) => ({
    id: row.id,
    author: row.author || row.name || "Anonymous",
    name: row.author || row.name || "Anonymous",
    email: row.email,
    message: row.message || row.review || "",
    review: row.message || row.review || "",
    created_at: row.created_at,
  }));
}

export async function addReview(review: {
  name: string;
  email: string;
  review: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    try {
      const local = localStorage.getItem("francis_portfolio_reviews");
      const current: ReviewItem[] = local ? JSON.parse(local) : [];
      const newItem: ReviewItem = {
        id: Date.now().toString(),
        author: review.name,
        name: review.name,
        email: review.email,
        message: review.review,
        review: review.review,
        created_at: new Date().toISOString(),
      };
      localStorage.setItem("francis_portfolio_reviews", JSON.stringify([newItem, ...current]));
      return { success: true };
    } catch (e: unknown) {
      const err = e as Error;
      return { success: false, error: err?.message || "Failed to save review" };
    }
  }

  // Insert into Supabase table with columns: author, email, message
  const { error } = await supabase.from("reviews").insert([
    {
      author: review.name,
      email: review.email,
      message: review.review,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
