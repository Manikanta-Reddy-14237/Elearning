import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './styles/studentdashboard.css';

const PdfViewer = ({ link, headers }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        const fetchPdfWithHeaders = async (url) => {
            try {
                const response = await fetch(url, {
                    headers: headers
                });
                const blob = await response.blob();
                setPdfUrl(URL.createObjectURL(blob));
            } catch (err) {
                console.error('Error fetching PDF:', err);
            }
        };

        fetchPdfWithHeaders(link);
    }, [link, headers]);

    return (

        <div className='pdf-container'>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                {pdfUrl ? (
                    <Viewer
                        fileUrl={pdfUrl}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                ) : (
                    <div>Loading PDF...</div>
                )}
            </Worker>
        </div>
    );
};

export default PdfViewer;
