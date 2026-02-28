import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        
        // Extract fields
        const services = formData.get('services') as string;
        const company = formData.get('company') as string;
        const manager = formData.get('manager') as string;
        const contact = formData.get('contact') as string;
        const email = formData.get('email') as string;
        const content = formData.get('content') as string;
        const file = formData.get('file') as File | null;

        // Load env variables
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        // Instead of erroring out entirely if Telegram isn't configured,
        // we can just log it and return success so the frontend works for now.
        if (!botToken || !chatId) {
            console.warn('Telegram Bot Token or Chat ID is not configured. Falling back to console log.');
            console.log('--- NEW INQUIRY ---');
            console.log(`Services: ${services}`);
            console.log(`Company: ${company}`);
            console.log(`Manager: ${manager}`);
            console.log(`Contact: ${contact}`);
            console.log(`Email: ${email}`);
            console.log(`Content: ${content}`);
            if (file) console.log(`File attached: ${file.name} (${file.size} bytes)`);
            
            return NextResponse.json({ success: true, message: "문의가 접수되었습니다 (Local mode)" });
        }

        // Format message
        let message = `🔔 *새로운 문의 접수*\n\n`;
        message += `*관심 서비스:* ${services || '없음'}\n`;
        message += `*기업명:* ${company || '미상'}\n`;
        message += `*담당자:* ${manager || '미상'}\n`;
        message += `*연락처:* ${contact || '미상'}\n`;
        message += `*이메일:* ${email || '미상'}\n\n`;
        message += `*문의 내용:*\n${content || '내용 없음'}\n`;
        
        // In a real production scenario, you'd upload the file to Supabase Storage 
        // and append the public URL to the message.
        if (file) {
             message += `\n📎 첨부파일 있음: ${file.name} (서버 저장소 연동 필)`;
        }

        // Send to Telegram
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Telegram API Error:', errorText);
            throw new Error('Failed to send telegram message');
        }

        return NextResponse.json({ success: true, message: "문의가 접수되었습니다." });

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
