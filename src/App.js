import React, { useState, useEffect } from 'react';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function App() {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    // Fetch the filled PDF file from the Zoho Sign API
    // fetch('https://sign.zoho.com/zs-api/v1/requests/323074000000048013/file', {
      fetch('/api/requests/323074000000048013/file', {
      headers: {
        'Authorization': 'Zoho-oauthtoken 1000.ae51a906d5586b60fd42036b84241ee5.d23e7daf84178232b225bc27751c41ed'
      }
    })
      .then(response => response.blob())
      .then(blob => {
        console.log(blob)
        setPdfBlob(blob);
      });
  }, []);

  console.log('pdfBlob', pdfBlob)
  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  // function changePage(offset) {
  //   setPageNumber(prevPageNumber => prevPageNumber + offset);
  // }

  // function previousPage() {
  //   changePage(-1);
  // }

  // function nextPage() {
  //   changePage(1);
  // }
useEffect(() => {
  if(pdfBlob) {
    const blobUrl = URL.createObjectURL(pdfBlob);
    setPdfBlobUrl(blobUrl)
  }
}, [pdfBlob])
console.log('pdfBlobUrl', pdfBlobUrl)
const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div>
      {pdfBlobUrl && (
        // <BlobProvider document={pdfBlob}>
        //   {({ url }) => (
        //     <div>
        //       <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        //         <Page pageNumber={pageNumber} />
        //       </Document>
        //       <div>
        //         <p>Page {pageNumber} of {numPages}</p>
        //         <button disabled={pageNumber <= 1} onClick={previousPage}>
        //           Previous
        //         </button>
        //         <button disabled={pageNumber >= numPages} onClick={nextPage}>
        //           Next
        //         </button>
        //       </div>
        //     </div>
        //   )}
        // </BlobProvider>
        // <BlobProvider document={pdfBlob}>
        //   {({ blob, url, loading, error }) => (
        //     <div>
        //       {loading && <p>Loading PDF...</p>}
        //       {error && <p>Error loading PDF: {error.message}</p>}
        //       {blob && <iframe src={url} width="100%" height="500px" />}
        //     </div>
        //   )}
        // </BlobProvider>
    //     <iframe 
    //   title="HTML Content Viewer"
    //   src={pdfBlobUrl} 
    //   width="70%" 
    //   height="70vh"
    // />
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
            <div
              style={{
                width: '44.375rem',
                height: '55.438rem',
                margin: '1rem auto',
              }}
            >
              <Viewer
                defaultScale={1}
                // scrollMode={ScrollMode.Page}
                // spreadsMode={SpreadsMode.EvenSpreads}
                // fileUrl={`files/abc.pdf`}
                fileUrl={pdfBlobUrl}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
      )}
    </div>
  );
}

export default App;