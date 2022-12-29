//import React from 'react';
import BookDescription5 from '../Reusable/BookDescription5';
import React, { useState } from 'react';
import { Document, Page ,pdfjs} from 'react-pdf/dist/esm/entry.webpack';

function Reading1() {
  
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  console.log(localStorage.getItem('bookURL'));

  const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);
const [title,setTitle] = useState(localStorage.getItem('bookTitle'));

document.addEventListener("contextmenu", (event) => {
event.preventDefault();
});

/*When document gets loaded successfully*/
function onDocumentLoadSuccess({ numPages }) {
setNumPages(numPages);
setPageNumber(1);
}

function changePage(offset) {
setPageNumber(prevPageNumber => prevPageNumber + offset);
}

function previousPage() {
changePage(-1);
}

function nextPage() {
changePage(1);
}

return (
<div align="center" style={{justifyContent:'center'}}>
  <h1>{title}</h1>
  <div style={{display:'flex',flexDirection:'row',alignItems:'flex-start'}}>
    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
          <button type="button" disabled={pageNumber <= 1} onClick={previousPage} style={{padding:'12px 24px'}}>
            &lt;
    </button>
    </div>

      <div align="center">
        <Document
        file={localStorage.getItem('bookURL')}
        onLoadSuccess={onDocumentLoadSuccess}
        
        >
        <Page pageNumber={pageNumber} height="800" />
        </Document>
        <div>
            <div>
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </div>
        </div>
        <div>
 

        </div>
      </div>
      <div>
      <button type="button" disabled={pageNumber >= numPages} onClick={nextPage} style={{padding:'12px 24px'}}>
      &gt;
      </button>
      </div>
      
  </div>
</div>
  );
}

export default Reading1