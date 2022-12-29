//import React from 'react';
import BookDescription5 from '../Reusable/BookDescription5';
import React, { useState } from 'react';
import { Document, Page ,pdfjs} from 'react-pdf/dist/esm/entry.webpack';

function Reading1() {
  
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  console.log(localStorage.getItem('bookURL'));

  const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);

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
<div>
<div>
<div>
<Document
file={localStorage.getItem('bookURL')}
onLoadSuccess={onDocumentLoadSuccess}
>
<Page pageNumber={pageNumber} height="800"/>
</Document>
<div>
<div>
Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
</div>
</div>
<div>
<button type="button" disabled={pageNumber <= 1} onClick={previousPage} className="Pre">
Previous
</button>
<button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
Next
</button>
</div>
  </div>
    </div>
    </div>
  );
}

export default Reading1