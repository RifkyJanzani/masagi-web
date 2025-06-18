-- Create company_profile table
CREATE TABLE IF NOT EXISTS company_profile (
  id SERIAL PRIMARY KEY,
  about_us TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  instagram_url VARCHAR(255),
  youtube_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_company_profile_id ON company_profile(id);

-- Enable Row Level Security (RLS)
ALTER TABLE company_profile ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to company_profile" ON company_profile
  FOR SELECT USING (true);

-- Create policy for authenticated users to insert/update
CREATE POLICY "Allow authenticated users to manage company_profile" ON company_profile
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_company_profile_updated_at 
  BEFORE UPDATE ON company_profile 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default data
INSERT INTO company_profile (about_us, email, phone, address, instagram_url, youtube_url) VALUES
(
  'Masagi Energi Hijau adalah perusahaan yang bergerak di bidang agroindustri berkelanjutan yang fokus pada pengolahan kelapa dan pengembangan teknologi tepat guna. Kami berkomitmen untuk memberikan produk berkualitas tinggi sambil menjaga kelestarian lingkungan.',
  'info@masagienergihijau.com',
  '+62 812-3456-7890',
  'Jl. Raya Kelapa No. 123, Desa Kelapa Indah, Kecamatan Kelapa Sejahtera, Kabupaten Kelapa Makmur, Provinsi Kelapa Bahagia, 12345',
  'https://instagram.com/masagienergihijau',
  'https://youtube.com/@masagienergihijau'
); 