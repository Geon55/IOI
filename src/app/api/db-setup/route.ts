import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// This is a temporary setup route to create tables if they don't exist
// and add the missing columns. In a real production app, you would use Supabase Dashboard or migrations.
export async function GET() {
    try {
        // We will execute a raw SQL query using rpc, but standard JS client can't execute DDL easily 
        // without a specific rpc function created in Supabase first.
        // As a workaround for this assessment, we'll return the SQL needed so the user 
        // can paste it into the Supabase SQL Editor.

        const sql = `
-- 1. Create site_content table
CREATE TABLE IF NOT EXISTS public.site_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    section_id TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories if empty
INSERT INTO public.site_content (section_id, title, description)
VALUES 
    ('category_sculpture', '조형물', '공간의 가치를 높이는 조형물을 만듭니다.'),
    ('category_environment', '환경디자인', '자연과 어우러지는 환경 디자인을 제공합니다.'),
    ('category_branding', '브랜딩', '브랜드의 본질을 담은 아이덴티티를 구축합니다.'),
    ('category_exhibition', '전시·인테리어', '경험을 구조화하는 전시 및 인테리어 디자인.'),
    ('category_event', '이벤트·행사', '사람들의 마음을 움직이는 행사를 기획합니다.'),
    ('category_research', '학술연구', '깊이 있는 연구를 바탕으로 디자인 솔루션을 도출합니다.')
ON CONFLICT (section_id) DO NOTHING;

-- 2. Add aspect_ratio to portfolio if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 
        FROM information_schema.columns 
        WHERE table_name='portfolio' AND column_name='aspect_ratio'
    ) THEN
        ALTER TABLE public.portfolio ADD COLUMN aspect_ratio TEXT DEFAULT 'auto';
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
