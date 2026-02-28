import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// This is a temporary setup route to add advanced portfolio detail columns
export async function GET() {
    try {
        const sql = `
-- Add advanced detail columns to portfolio table
DO $$
BEGIN
    -- 1. eng_title
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='portfolio' AND column_name='eng_title') THEN
        ALTER TABLE public.portfolio ADD COLUMN eng_title TEXT;
    END IF;

    -- 2. creative_director
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='portfolio' AND column_name='creative_director') THEN
        ALTER TABLE public.portfolio ADD COLUMN creative_director TEXT;
    END IF;

    -- 3. design
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='portfolio' AND column_name='design') THEN
        ALTER TABLE public.portfolio ADD COLUMN design TEXT;
    END IF;

    -- 4. summary
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='portfolio' AND column_name='summary') THEN
        ALTER TABLE public.portfolio ADD COLUMN summary TEXT;
    END IF;

    -- 5. content_blocks (JSONB array to hold multiple images and text blocks)
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name='portfolio' AND column_name='content_blocks') THEN
        ALTER TABLE public.portfolio ADD COLUMN content_blocks JSONB DEFAULT '[]'::jsonb;
    END IF;

    -- 6. Storage Bucket for Images
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('images', 'images', true)
    ON CONFLICT (id) DO UPDATE SET public = true;

    -- 7. Storage Policies
    -- public access
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_access' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "public_access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
    END IF;

    -- public insert (For testing/admin anon key usage, we allow all for now)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_insert' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "public_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
    END IF;

    -- public update
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_update' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "public_update" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
    END IF;

    -- public delete
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_delete' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "public_delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');
    END IF;

END $$;
        `;

        return NextResponse.json({
            success: true,
            message: "Supabase SQL Editor에 아래 SQL을 복사하여 실행해주세요.",
            sql: sql
        });

    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
