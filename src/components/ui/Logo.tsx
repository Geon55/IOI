import React from 'react';
import Image from 'next/image';

type LogoVariant = 'white' | 'color' | 'grey' | 'iconColor' | 'iconWhite';

interface LogoProps {
    width?: number;
    height?: number;
    variant?: LogoVariant;
}

const Logo: React.FC<LogoProps> = ({ width = 150, height = 40, variant = 'white' }) => {
    // Map variant to corresponding image file
    const variantMap: Record<LogoVariant, string> = {
        white: '/images/logo/logo_white.png',
        color: '/images/logo/logo_color.png',
        grey: '/images/logo/logo_grey.png',
        iconColor: '/images/logo/logo_icon_color.png',
        iconWhite: '/images/logo/logo_icon_white.png',
    };

    const imgSrc = variantMap[variant] || variantMap.white;

    return (
        <div style={{ position: 'relative', width, height }}>
            <Image
                src={imgSrc}
                alt="IOI Logo"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
            />
        </div>
    );
};

export default Logo;
