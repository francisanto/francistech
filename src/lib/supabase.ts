import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

export interface ReviewItem {
  id?: string;
  name: string;
  email?: string;
  review: string;
  created_at?: string;
}

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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
    .select("id, name, review, created_at")
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

  return data || [];
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
        name: review.name,
        email: review.email,
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

  const { error } = await supabase.from("reviews").insert([
    {
      name: review.name,
      email: review.email,
      review: review.review,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
