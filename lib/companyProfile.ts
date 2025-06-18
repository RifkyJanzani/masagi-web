import { supabase } from './supabase';

export interface CompanyProfile {
  id: number;
  about_us: string;
  email: string;
  phone: string;
  address: string;
  instagram_url: string;
  youtube_url: string;
  created_at: string;
  updated_at: string;
}

export async function getCompanyProfile(): Promise<CompanyProfile | null> {
  try {
    const { data, error } = await supabase
      .from('company_profile')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching company profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching company profile:', error);
    return null;
  }
}

export async function updateCompanyProfile(profile: Partial<CompanyProfile>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('company_profile')
      .update(profile)
      .eq('id', 1); // Assuming we only have one profile record

    if (error) {
      console.error('Error updating company profile:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating company profile:', error);
    return false;
  }
} 