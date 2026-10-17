'use client'
import { useState, useEffect } from 'react';

export default function VideoObligatoire({numero, onFini}: {numero:number, onFini:()=>void}){
  const [sec, setSec]=useState(90);
  useEffect(()=>{
    if(sec>0){
      const t=setTimeout(()=>setSec(sec-1),1000);
      return()=>clearTimeout(t);
    }else{
      onFini();
    }
  },[sec]);
  return(
    <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',background:'#000',zIndex:99999,color:'#fff',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <h2 style={{color:'gold'}}>👑 KING SHIPPING</h2>
      <p style={{background:'gold',color:'#000',padding:'5px 15px',borderRadius:'20px',fontWeight:'bold'}}>VIDEO {numero}/2 OBLIGATOIRE - 1.5 MIN</p>
      <h1 style={{fontSize:'80px',color:'gold',margin:'20px 0'}}>{Math.floor(sec/60)}:{String(sec%60).padStart(2,'0')}</h1>
      <p style={{color:'#aaa'}}>Reste {sec}s avant suite</p>
      <div style={{width:'90%',maxWidth:'350px',height:'200px',background:'#1a1a1a',border:'2px solid gold',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center'}}>📺 PUB QUI RAPPORTE<br/>0182349840<br/>$0.02 par vue - 90s</div>
      <button disabled={sec>0} onClick={onFini} style={{width:'90%',maxWidth:'350px',padding:'18px',background:sec>0?'#333':'gold',color:sec>0?'#888':'#000',border:'none',borderRadius:'12px',marginTop:'20px',fontWeight:'bold'}}>{sec>0?`ATTENDS ${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`:`VIDEO ${numero} VUE - CONTINUER`}</button>
    </div>
  )
}