// components/LandingPage.tsx
'use client'
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getCompanyProfile, CompanyProfile } from '@/lib/companyProfile';

interface Journal {
  id: number;
  title: string;
  university: string;
  p_issn: string;
  e_issn: string;
  cover: string;
  badges: { label: string; color: string }[];
  created_at: string;
}

export default function LandingPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const sectionId = window.location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch both journals and company profile
      const [journalsData, profileData] = await Promise.all([
        fetchJournals(),
        getCompanyProfile()
      ]);

      setJournals(journalsData);
      setCompanyProfile(profileData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJournals = async (): Promise<Journal[]> => {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3); // Ambil 3 jurnal terbaru

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching journals:', error);
      return [];
    }
  };

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
      <HeroSection />

    </>
  );
}
