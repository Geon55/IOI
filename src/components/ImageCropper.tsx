import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
    imageFile: File;
    aspect: number | undefined; // undefined for free crop
    onCropCancel: () => void;
    onCropComplete: (croppedFile: File) => void;
}

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function ImageCropper({ imageFile, aspect, onCropCancel, onCropComplete }: ImageCropperProps) {
    const [imgSrc, setImgSrc] = useState('');
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

    useEffect(() => {
        setCrop(undefined);
        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
        reader.readAsDataURL(imageFile);
    }, [imageFile]);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    const handleSave = async () => {
        if (!completedCrop || !imgRef.current) {
            // If they didn't crop, just return original
            onCropComplete(imageFile);
            return;
        }

        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width * scaleX;
        canvas.height = completedCrop.height * scaleY;

        ctx.imageSmoothingQuality = 'high';

        const cropX = completedCrop.x * scaleX;
        const cropY = completedCrop.y * scaleY;
        const cropWidth = completedCrop.width * scaleX;
        const cropHeight = completedCrop.height * scaleY;

        ctx.drawImage(
            image,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight
        );

        canvas.toBlob((blob) => {
            if (!blob) return;
            const croppedFile = new File([blob], imageFile.name, { type: 'image/jpeg' });
            onCropComplete(croppedFile);
        }, 'image/jpeg');
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem', maxWidth: '90vw', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>이미지 크롭 테두리 조정</h3>
                    <button type="button" onClick={onCropCancel} style={{ cursor: 'pointer', padding: '0.5rem', background: 'none', border: 'none', fontSize: '1.5rem', lineHeight: 1 }}>&times;</button>
                </div>

                <div style={{ maxHeight: '70vh', overflow: 'auto', display: 'flex', justifyContent: 'center' }}>
                    {!!imgSrc && (
                        <ReactCrop
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}
                        >
                            <img ref={imgRef} src={imgSrc} alt="Crop me" onLoad={onImageLoad} style={{ maxHeight: '60vh', objectFit: 'contain' }} />
                        </ReactCrop>
                    )}
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button type="button" onClick={onCropCancel} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '0.25rem', backgroundColor: '#fff', cursor: 'pointer' }}>취소</button>
                    <button type="button" onClick={handleSave} style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem', backgroundColor: '#2563eb', color: '#fff', cursor: 'pointer' }}>저장</button>
                </div>
            </div>
        </div>
    );
}
