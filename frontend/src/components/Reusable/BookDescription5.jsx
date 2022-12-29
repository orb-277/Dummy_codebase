
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Document, Page ,pdfjs} from 'react-pdf/dist/esm/entry.webpack';



function BookDescription5() {
        let browseclick=0;
        const [nav, setnav]= useState(0);
        let navigate=useNavigate();
        let path= "/reading1";
        // var book;
        //const [id, setId] = useState(0);
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        const [title, setTitle] = useState('');
        const [author,setAuthor] =  useState('');
        const [year,setYear] = useState('');
        const [img,setImg] = useState('');
        const [description,setDescription] = useState('');

        useEffect(()=>{
                if(nav!==0){
                        
                        navigate(path);
                }
                const res = fetch('http://localhost:8000/library/22/?format=json');
                // //console.log(res);
                
                res
                .then((response) => response.json())
                .then((data) => {
                        console.log(data);
                        setTitle(data.title);
                        setAuthor(data.author);
                        setYear(data.year);
                        setImg('https://cors-anywhere.herokuapp.com/'+data.url);
                        setDescription(data.description);
                })
                .catch(err => console.log(err));

        },[nav])

        const handleClick=()=>{
                localStorage.setItem("bookURL",img);
                browseclick= browseclick+1;
                setnav(browseclick);
        }
 
        


        //let url="https://cors-anywhere.herokuapp.com/https://archive.org/download/tagalogenglishen00niggrich/tagalogenglishen00niggrich.pdf#page=1"
  return (
    <div style={{width:'1086px', height:'511px',display:'flex',flexDirection:'row', alignItems:'flex-start',flex: 'none',order: 1,flexGrow: 0, paddingTop:'8px',gap:'48px',position:'absolute',border:'1px solid #ECF1F4', marginLeft:'8px'}}>
        <div style={{padding:0,display:'flex',flexDirection:'column', alignItems:'flex-start', width:'519px',height:'503px'}}>
                <div style={{width:'auto', height:'28px', marginTop:'48px', marginLeft:'24px'}}>
                    <h3 style={{fontFamily: 'Work Sans',fontSize:'24px',fontWeight:'600',lineHeight:'28.15px',letterSpacing:'-2%', color:'#0E0E2C',margin:0}}>
                            {title}
                    </h3>
                </div>
                <div style={{width:'104px', height:'44px', marginTop:'16px', marginLeft:'24px'}}>
                        <p style={{margin:0,fontFamily: 'Work Sans',fontSize:'16px',fontWeight:'500',lineHeight:'22.4px',letterSpacing:'-2%', color:'#4A4A68'}}>
                            {author}
                            <br />
                            {year}

                        </p>
                </div>
                <div style={{width:'425px', height:'auto', marginTop:'16px', marginLeft:'24px',display:'flex',flexDirection:'column', alignItems:'flex-start',flex: 'none',order: 2,flexGrow: 0, padding:0,gap:'16px',fontFamily: 'Work Sans',fontSize:'16px',fontWeight:'500',lineHeight:'22.4px',letterSpacing:'-2%', color:'#4A4A68'}}>
                        {description}
                </div>
                <button style={{display:'flex',flexDirection:'column', alignItems:'center',flex: 'none',order: 3,flexGrow: 0, padding:'12px 24px',width:'118px', height:'48px', background:'#EFEFFD',borderRadius:'8px', marginTop:'16px', marginLeft:'24px',fontFamily: 'Work Sans',fontSize:'16px',fontWeight:'700',lineHeight:'18.77px',letterSpacing:'4%', color:'#428CFB',border:'none'}} onClick={handleClick}>
                        READ
                </button>

        </div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center', alignItems:'flex-start',flex: 'none',order: 1,flexGrow: 1, padding:'12px 24px',width:'519px', height:'480px', gap:'10px',borderRadius:'8px', marginLeft:'48px'}}>
            <div style={{width:'320px', height:'480px',flex: 'none',order: 0,flexGrow: 0,
                  backgroundSize: '100% 100%'}}>
                        <Document file={img}>
                                <Page pageNumber={1}></Page>
                        </Document>
                        

            </div>

        </div>

    </div>
  )
}

export default BookDescription5