"use client";
import { useState, useEffect, useCallback } from "react";

const CATS = {
  towels:{icon:"\u{1F6C1}",label:"Bath Towels"},dinnerware:{icon:"\u{1F37D}\uFE0F",label:"Dinnerware"},
  flatware:{icon:"\u{1F374}",label:"Flatware"},glasses:{icon:"\u{1F943}",label:"Glasses"},
  bedding:{icon:"\u{1F6CF}\uFE0F",label:"Bedding"},bath:{icon:"\u{1F6BF}",label:"Bath"},
  kitchen:{icon:"\u{1F52A}",label:"Kitchen"},decor:{icon:"\u{1FAB4}",label:"Decor"},other:{icon:"\u{1F4E6}",label:"Other"},
};

const INIT = [
  {id:"p1",c:"towels",n:"Super-Plush Bath Towel (Set of 2)",b:"Brooklinen",p:75,sp:60,u:"set of 2",m:"100% Turkish cotton, 770 GSM, zero-twist",t:"top",tl:"Top Pick",note:"Wait for Anniversary Sale late April \u2014 25% off sitewide.",sale:"25% off late Apr",live:false,link:"https://www.brooklinen.com/products/super-plush-bath-towels",img:"https://m.media-amazon.com/images/I/71nMgOLqRzL._AC_SL1500_.jpg"},
  {id:"p2",c:"towels",n:"Classic Turkish Cotton Towel",b:"Parachute",p:31,sp:26,u:"each",m:"100% long-staple Turkish cotton, 700 GSM",t:"top",tl:"Top Pick",note:"15% off first order via email signup.",sale:"15% off 1st order",live:true,link:"https://www.parachutehome.com/products/bath-towel-classic",img:"https://parachutehome.com/cdn/shop/files/01-PDP_Bath_Classic-Turkish-Cotton_Towels_White_Bath-Towel_Hero.jpg?v=1709932979&width=400"},
  {id:"p3",c:"towels",n:"Turkish Quick-Dry Set",b:"Quince",p:50,sp:50,u:"set of 2",m:"100% organic Turkish cotton, ~600 GSM",t:"value",tl:"Best Value",note:"63% below comparable retail. Order by Apr 20.",sale:"",live:false,link:"https://www.quince.com/bath-towels",img:"https://images.quince.com/iJR0hZZ1hJeyjBZhYMGAB/bb3aab3ce9c72c71eeeb866c8cc7e0af/pdp-hero-turkish-cotton-bath-towel-set-white.jpg?w=400"},
  {id:"p4",c:"towels",n:"Hydrocotton Quick-Dry",b:"Pottery Barn",p:26,sp:26,u:"each",m:"Hydrocotton\u2122, 16 colors",t:"value",tl:"Great Value",note:"CNN Underscored top pick.",sale:"",live:false,link:"https://www.potterybarn.com/products/hydrocotton-organic-bath-towels/",img:"https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202349/0008/hydrocotton-organic-quick-drying-towels-l.jpg"},
  {id:"p5",c:"towels",n:"Dreamweave Waffle (Set of 2)",b:"Brooklinen",p:89,sp:67,u:"set of 2",m:"100% Turkish cotton, waffle weave",t:"splurge",tl:"Upgrade",note:"Fastest drying towel tested. 25% off late April.",sale:"25% off late Apr",live:false,link:"https://www.brooklinen.com/products/waffle-bath-towels",img:"https://m.media-amazon.com/images/I/81gGnCyXOeL._AC_SL1500_.jpg"},
  {id:"p6",c:"towels",n:"Spa Bath Towels",b:"Threshold (Target)",p:14,sp:14,u:"each",m:"100% cotton, ~500 GSM",t:"budget",tl:"Budget",note:"Reviewed.com best value pick.",sale:"",live:false,link:"https://www.target.com/p/spa-bath-towel-threshold/",img:"https://target.scene7.com/is/image/Target/GUEST_90d0a8bf-1c9c-4c41-9765-9acab0d3cbe9?wid=400"},
  {id:"p7",c:"dinnerware",n:"Base Dinnerware Set (12-pc)",b:"Fable",p:215,sp:151,u:"12-pc, service for 4",m:"Stoneware, hand-finished Portugal",t:"top",tl:"\u{1F534} ON SALE",note:"SPRING SALE: up to 30% off NOW.",sale:"Up to 30% off",live:true,link:"https://us.fable.com/products/dinnerware-set",img:"https://m.media-amazon.com/images/I/71JZzBrUxFL._AC_SL1500_.jpg"},
  {id:"p8",c:"dinnerware",n:"Classic Dinnerware (24-pc)",b:"Fable",p:315,sp:221,u:"24-pc, service for 4",m:"Stoneware, Portugal, full set w/ mugs",t:"splurge",tl:"\u{1F534} ON SALE",note:"SPRING SALE: up to 30% off NOW.",sale:"Up to 30% off",live:true,link:"https://us.fable.com/products/dinnerware-set",img:"https://m.media-amazon.com/images/I/71Z9cmAQiDL._AC_SL1500_.jpg"},
  {id:"p9",c:"dinnerware",n:"The Everyday Set (12-pc)",b:"East Fork",p:290,sp:290,u:"12-pc, service for 4",m:"Stoneware, Asheville NC, B-Corp",t:"splurge",tl:"Artisan",note:"Heirloom quality.",sale:"",live:false,link:"https://www.eastfork.com/shop/sets",img:"https://eastfork.com/cdn/shop/files/EF_0003_EverydaySet_Panna_v2_HERO.jpg?v=1712155000&width=400"},
  {id:"p10",c:"dinnerware",n:"Reactive Glaze Stoneware",b:"West Elm",p:48,sp:48,u:"set of 4 plates",m:"Stoneware, reactive glaze",t:"value",tl:"Great Value",note:"Mix & match colors.",sale:"",live:false,link:"https://www.westelm.com/shop/tabletop/",img:"https://assets.westelm.com/is/image/westelm/west-elm-reactive-glaze-dinnerware-o-1.jpg"},
  {id:"p11",c:"dinnerware",n:"GLADELIG 18-Piece Set",b:"IKEA",p:50,sp:40,u:"18-pc, service for 6",m:"Stoneware, reactive glaze",t:"budget",tl:"\u{1F534} ON SALE",note:"ON SALE thru Apr 5.",sale:"Thru Apr 5",live:true,link:"https://www.ikea.com/us/en/p/gladelig-18-piece-dinnerware-set-gray-50477221/",img:"https://www.ikea.com/us/en/images/products/gladelig-18-piece-dinnerware-set-gray__1014642_pe829780_s5.jpg"},
  {id:"p12",c:"flatware",n:"The Flatware (20-pc)",b:"Fable",p:130,sp:91,u:"20-pc, service for 4",m:"18/10 stainless, matte or polished",t:"top",tl:"\u{1F534} ON SALE",note:"SPRING SALE: up to 30% off NOW.",sale:"Up to 30% off",live:true,link:"https://us.fable.com/collections/flatware",img:"https://m.media-amazon.com/images/I/61A0F+wqF7L._AC_SL1500_.jpg"},
  {id:"p13",c:"flatware",n:"Simple Flatware (20-pc)",b:"Hawkins New York",p:95,sp:95,u:"20-pc, service for 4",m:"18/10 stainless, multiple finishes",t:"top",tl:"Design Pick",note:"Brooklyn-based. Minimalist.",sale:"",live:false,link:"https://www.hawkinsnewyork.com/collections/flatware-sets",img:"https://www.hawkinsnewyork.com/cdn/shop/files/HNY_Simple-Flatware-Set_Matte-Gold_Hero_V2.jpg?v=1700000000&width=400"},
  {id:"p14",c:"flatware",n:"Flatware Set (20-pc)",b:"Snowe",p:85,sp:85,u:"20-pc, service for 4",m:"18/10 stainless steel, polished",t:"value",tl:"Great Value",note:"Clean modern lines.",sale:"",live:false,link:"https://snowehome.com/collections/modern-flatware-set",img:"https://snowehome.com/cdn/shop/products/Flatware_Hero_1200x.jpg"},
  {id:"p15",c:"flatware",n:"Surge 50-Piece Set",b:"Oneida",p:60,sp:60,u:"50-pc, service for 8",m:"18/10 stainless, satin finish",t:"value",tl:"Best Value",note:"Service for 8 + serving pieces.",sale:"",live:false,link:"https://www.amazon.com/s?k=oneida+surge+flatware",img:"https://m.media-amazon.com/images/I/81M7vlXfvnL._AC_SL1500_.jpg"},
  {id:"p16",c:"flatware",n:"\u00C4TBART 20-Piece Set",b:"IKEA",p:20,sp:20,u:"20-pc, service for 4",m:"Stainless steel",t:"budget",tl:"Budget",note:"Great starter set.",sale:"",live:false,link:"https://www.ikea.com/us/en/p/aetbart-20-piece-flatware-set-stainless-steel-80430043/",img:"https://www.ikea.com/us/en/images/products/aetbart-20-piece-flatware-set-stainless-steel__0713270_pe729508_s5.jpg"},
  {id:"p17",c:"glasses",n:"Glassware Set (8-pc)",b:"Fable",p:90,sp:63,u:"8-pc (4 tall + 4 short)",m:"Japanese soda-lime, ion-toughened",t:"top",tl:"\u{1F534} ON SALE",note:"SPRING SALE: up to 30% off NOW.",sale:"Up to 30% off",live:true,link:"https://us.fable.com/products/glassware-set",img:"https://m.media-amazon.com/images/I/61F4cRWYi3L._AC_SL1500_.jpg"},
  {id:"p18",c:"glasses",n:"Bodega Glass (Set of 6)",b:"Bormioli Rocco",p:16,sp:16,u:"set of 6",m:"Tempered glass, 12 oz, stackable",t:"budget",tl:"Budget",note:"Classic caf\u00E9-style.",sale:"",live:false,link:"https://www.amazon.com/dp/B001AS4D48",img:"https://m.media-amazon.com/images/I/81q4N5bZxWL._AC_SL1500_.jpg"},
  {id:"p19",c:"glasses",n:"Pure Water Glasses (Set of 6)",b:"Schott Zwiesel",p:60,sp:60,u:"set of 6",m:"Tritan crystal, German-made",t:"splurge",tl:"Upgrade",note:"Near-unbreakable crystal.",sale:"",live:false,link:"https://www.williams-sonoma.com/products/schott-zwiesel-pure/",img:"https://assets.wsimgs.com/wsimgs/rk/images/dp/wcm/202340/0152/schott-zwiesel-pure-water-glasses-set-of-6-l.jpg"},
  {id:"p20",c:"glasses",n:"Marta Tasting Glasses (Set of 6)",b:"Crate & Barrel",p:37,sp:37,u:"set of 6",m:"Clear glass, tapered, 7.5 oz",t:"value",tl:"Great Value",note:"Versatile shape.",sale:"",live:false,link:"https://www.crateandbarrel.com/marta-tasting-glasses/s458498",img:"https://cb.scene7.com/is/image/Crate/MartaTastingGlassS6SHF16/$web_pdp_main_carousel_xs$/220913133759/marta-tasting-glasses-set-of-6.jpg"},
];

const SALES = [
  {t:"Fable Spring Sale \u2014 up to 30% off sitewide dinnerware, glassware, flatware",s:"live",l:"https://us.fable.com/"},
  {t:"IKEA GLADELIG dinnerware set on sale through April 5",s:"live",l:"https://www.ikea.com/us/en/p/gladelig-18-piece-dinnerware-set-gray-50477221/"},
  {t:"Parachute \u2014 15% off first order with email signup",s:"live",l:"https://www.parachutehome.com/"},
  {t:"Brooklinen \u2014 20% off for new email + phone signup",s:"live",l:"https://www.brooklinen.com/"},
  {t:"Brooklinen Anniversary Sale late April \u2014 25% off sitewide, up to 50% bundles",s:"soon",l:"https://www.brooklinen.com/"},
  {t:"Quince ships from Turkey \u2014 order by Apr 20 for May 1 delivery",s:"info",l:"https://www.quince.com/"},
];

const TAG={top:{bg:"#EDF5EF",fg:"#4A7C59"},value:{bg:"#EDF1F8",fg:"#4A6FA5"},splurge:{bg:"#FFF8E7",fg:"#B8860B"},budget:{bg:"#EDE9E3",fg:"#6B6860"}};
const fmt=p=>"$"+p.toLocaleString();
const STORAGE_KEY = "axel-v5";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function Thumb({brand="?",cat,img}){
  const [err,setErr]=useState(false);
  if(img&&!err) return <div style={{width:46,height:46,borderRadius:8,overflow:"hidden",border:"1px solid #E5E1DA",flexShrink:0,background:"#F6F4F0"}}><img src={img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={()=>setErr(true)}/></div>;
  return <div style={{width:46,height:46,borderRadius:8,background:"#F6F4F0",border:"1px solid #E5E1DA",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,gap:1}}>
    <span style={{fontSize:9,fontWeight:600,color:"#6B6860",letterSpacing:.5,lineHeight:1}}>{(brand||"?").split(" ").map(w=>w[0]).join("").slice(0,3)}</span>
    <span style={{fontSize:14,lineHeight:1}}>{CATS[cat]?.icon||"\u{1F4E6}"}</span>
  </div>;
}

export default function Home(){
  const [products,setProducts]=useState(INIT);
  const [filter,setFilter]=useState("all");
  const [sort,setSort]=useState("default");
  const [starred,setStarred]=useState(new Set());
  const [purchased,setPurchased]=useState(new Set());
  const [collapsed,setCollapsed]=useState(new Set());
  const [salesOpen,setSalesOpen]=useState(true);
  const [showAdd,setShowAdd]=useState(false);
  const [subs,setSubs]=useState([]);
  const [qInput,setQInput]=useState("");
  const [qCat,setQCat]=useState("other");
  const [urlInput,setUrlInput]=useState("");
  const [urlNote,setUrlNote]=useState("");
  const [urlCat,setUrlCat]=useState("other");
  const [toast,setToast]=useState("");
  const [mounted,setMounted]=useState(false);

  useEffect(()=>{
    const d = loadState();
    if(d){
      if(d.custom) setProducts([...INIT,...d.custom]);
      if(d.starred) setStarred(new Set(d.starred));
      if(d.purchased) setPurchased(new Set(d.purchased));
      if(d.collapsed) setCollapsed(new Set(d.collapsed));
      if(d.subs) setSubs(d.subs);
      if(d.salesOpen!==undefined) setSalesOpen(d.salesOpen);
    }
    setMounted(true);
  },[]);

  const save=useCallback((p,s,pu,co,su,so)=>{
    saveState({
      custom:p.filter(x=>!INIT.find(d=>d.id===x.id)),
      starred:[...s],purchased:[...pu],collapsed:[...co],subs:su,salesOpen:so
    });
  },[]);

  const toggle=(fn,key)=>id=>{fn(prev=>{const n=new Set(prev);n.has(id)?n.delete(id):n.add(id);
    const args=key==="starred"?[products,n,purchased,collapsed,subs,salesOpen]:[products,starred,n,collapsed,subs,salesOpen];
    save(...args);return n;});};
  const toggleStar=toggle(setStarred,"starred");
  const togglePurch=toggle(setPurchased,"purchased");
  const toggleColl=cat=>{setCollapsed(p=>{const n=new Set(p);n.has(cat)?n.delete(cat):n.add(cat);save(products,starred,purchased,n,subs,salesOpen);return n;});};

  const addToQueue=()=>{if(!qInput.trim())return;const n=[...subs,{query:qInput,category:qCat,date:new Date().toISOString()}];setSubs(n);setQInput("");save(products,starred,purchased,collapsed,n,salesOpen);};
  const removeSub=i=>{const n=subs.filter((_,idx)=>idx!==i);setSubs(n);save(products,starred,purchased,collapsed,n,salesOpen);};

  const addUrl=()=>{
    if(!urlInput.trim())return;
    let name=urlNote||urlInput.replace(/https?:\/\/(www\.)?/,"").split("/").filter(Boolean).slice(0,2).join(" / ");
    const np=[...products,{id:`url-${Date.now()}`,c:urlCat,n:name,b:"",p:0,sp:0,u:"",m:"",t:"value",tl:"Manually added",note:urlNote||"",sale:"",live:false,link:urlInput,img:"",src:"url"}];
    setProducts(np);setUrlInput("");setUrlNote("");save(np,starred,purchased,collapsed,subs,salesOpen);
  };

  const doRefresh=()=>{
    const queueItems=subs.map(s=>`\u2022 ${s.query} (${CATS[s.category]?.label||s.category})`).join("\n");
    const existingItems=products.map(p=>`\u2022 ${p.n} by ${p.b} \u2014 $${p.sp} [${CATS[p.c]?.label}]`).join("\n");
    const manualItems=products.filter(p=>p.src==="url").map(p=>`\u2022 ${p.n} \u2014 ${p.link} [${CATS[p.c]?.label}]`).join("\n");
    let msg=`REFRESH my apartment shopping list.\n\n`;
    if(subs.length>0) msg+=`**Queue items to research:**\n${queueItems}\n\n`;
    if(manualItems) msg+=`**Manually added URLs to research:**\n${manualItems}\n\n`;
    msg+=`**Current items \u2014 check for better deals/new sales:**\n${existingItems}\n\nPlease research the queue items, check for updated sales on existing items, and give me an updated product list I can add.`;
    navigator.clipboard.writeText(msg).then(()=>{
      setToast("Copied to clipboard! Paste into Claude Chat.");
      setTimeout(()=>setToast(""),3000);
    }).catch(()=>{
      setToast("Couldn\u2019t copy \u2014 check browser permissions.");
      setTimeout(()=>setToast(""),3000);
    });
  };

  const filtered=filter==="all"?products:products.filter(p=>p.c===filter);
  const sorted=[...filtered].sort((a,b)=>{switch(sort){case"price-asc":return(a.sp||a.p)-(b.sp||b.p);case"price-desc":return(b.sp||b.p)-(a.sp||a.p);case"savings-desc":return(b.p-b.sp)-(a.p-a.sp);default:return 0;}});
  const groups={};sorted.forEach(p=>{if(!groups[p.c])groups[p.c]=[];groups[p.c].push(p);});
  const catOrder=Object.keys(CATS).filter(c=>groups[c]);

  let saleTotal=0,fullTotal=0;
  ["towels","dinnerware","flatware","glasses"].forEach(c=>{const t=products.find(p=>p.c===c&&p.t==="top");if(t){saleTotal+=t.sp;fullTotal+=t.p;}});
  const daysLeft=Math.ceil((new Date("2026-05-01")-new Date())/864e5);

  if(!mounted) return null;

  return <div style={{fontFamily:"'DM Sans',sans-serif",background:"#F6F4F0",color:"#1A1A18",minHeight:"100vh"}}>
    <style>{`
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .4s ease-out both}
    a.prow{text-decoration:none;color:inherit;display:flex;align-items:center;gap:11px;flex:1;min-width:0}
    a.prow:hover{opacity:1}
    .card{transition:all .15s;background:#fff}
    .card:hover{box-shadow:0 2px 8px rgba(0,0,0,.08),0 8px 20px rgba(0,0,0,.05);transform:translateY(-1px)}
    input:focus,select:focus{outline:2px solid #C4A06A;outline-offset:-1px}
    a.slink{text-decoration:none;transition:opacity .15s;display:flex;align-items:center;gap:10px}
    a.slink:hover{opacity:.75}
    @keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    .toast{animation:toastIn .3s ease-out both}
    `}</style>

    {/* TOAST */}
    {toast&&<div className="toast" style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#1A1A18",color:"#fff",padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>{toast}</div>}

    {/* HEADER */}
    <div style={{padding:"40px 0 20px",borderBottom:"1px solid #E5E1DA"}}>
      <div style={{maxWidth:1220,margin:"0 auto",padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16}}>
        <div>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:34,fontWeight:400,letterSpacing:-.5,lineHeight:1.1}}>The Axel &mdash; Apartment Essentials</h1>
          <p style={{color:"#6B6860",fontSize:13,marginTop:6,fontWeight:300}}>545 Vanderbilt Ave, Brooklyn &middot; Ordering online</p>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{background:"#FDE8E8",border:"1px solid #C0392B40",borderRadius:100,padding:"6px 14px",fontSize:12,fontWeight:500,display:"flex",alignItems:"center",gap:5}}>Move-in <span style={{fontFamily:"'JetBrains Mono'",fontWeight:500,fontSize:13,color:"#C0392B"}}>{daysLeft}d</span></div>
          <div style={{background:"#fff",border:"1px solid #E5E1DA",borderRadius:100,padding:"6px 14px",fontSize:12,fontWeight:500,display:"flex",alignItems:"center",gap:5}}>w/ sales <span style={{fontFamily:"'JetBrains Mono'",fontWeight:500,fontSize:13,color:"#9A7B4F"}}>{fmt(saleTotal)}</span></div>
          <div style={{background:"#EDF5EF",border:"1px solid #4A7C5940",borderRadius:100,padding:"6px 14px",fontSize:12,fontWeight:500,display:"flex",alignItems:"center",gap:5}}>saving <span style={{fontFamily:"'JetBrains Mono'",fontWeight:500,fontSize:13,color:"#4A7C59"}}>{fmt(fullTotal-saleTotal)}</span></div>
          <button onClick={doRefresh} style={{background:"#1A1A18",color:"#fff",border:"none",borderRadius:100,padding:"6px 16px",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans'",display:"flex",alignItems:"center",gap:5}}>&#8635; Refresh</button>
        </div>
      </div>
    </div>

    <div style={{maxWidth:1220,margin:"0 auto",padding:"0 24px"}}>

      {/* SALES */}
      <div style={{background:"#fff",border:"1px solid #E5E1DA",borderRadius:10,marginTop:20,marginBottom:20,boxShadow:"0 1px 3px rgba(0,0,0,.04)",overflow:"hidden"}}>
        <div onClick={()=>{const v=!salesOpen;setSalesOpen(v);save(products,starred,purchased,collapsed,subs,v);}} style={{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",cursor:"pointer",userSelect:"none"}}>
          <span style={{fontSize:14,color:"#6B6860",transition:"transform .2s",transform:salesOpen?"rotate(0)":"rotate(-90deg)"}}>{"\u25BE"}</span>
          <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:17,fontWeight:400,flex:1}}>Active Sales &amp; Timing</h3>
          <span style={{fontSize:11,color:"#C0392B",background:"#FDE8E8",padding:"2px 8px",borderRadius:100,fontWeight:600}}>{SALES.filter(s=>s.s==="live").length} live</span>
        </div>
        {salesOpen&&<div style={{padding:"0 18px 14px"}}>
          {SALES.map((s,i)=><a key={i} href={s.l} target="_blank" rel="noopener noreferrer" className="slink" style={{padding:"9px 14px",borderRadius:8,marginBottom:4,background:s.s==="live"?"#FDE8E8":s.s==="soon"?"#FFF8E7":"#F6F4F0",border:"1px solid",borderColor:s.s==="live"?"#C0392B20":s.s==="soon"?"#B8860B20":"#E5E1DA",color:s.s==="live"?"#C0392B":s.s==="soon"?"#B8860B":"#6B6860",fontSize:13,fontWeight:500}}>
            <span>{s.s==="live"?"\u{1F534}":s.s==="soon"?"\u{1F7E1}":"\u2139\uFE0F"}</span>
            <span style={{flex:1}}>{s.t}</span>
            <span style={{opacity:.4,fontSize:14}}>{"\u2197"}</span>
          </a>)}
        </div>}
      </div>

      {/* FILTERS */}
      <div style={{display:"flex",gap:8,padding:"8px 0 16px",flexWrap:"wrap",alignItems:"center"}}>
        {["all",...Object.keys(CATS).filter(k=>groups[k])].map(k=><button key={k} onClick={()=>setFilter(k)} style={{background:filter===k?"#1A1A18":"#fff",color:filter===k?"#fff":"#6B6860",border:`1px solid ${filter===k?"#1A1A18":"#E5E1DA"}`,borderRadius:100,padding:"6px 13px",fontSize:12,fontFamily:"'DM Sans'",cursor:"pointer"}}>{k==="all"?"All":`${CATS[k]?.icon} ${CATS[k]?.label}`}</button>)}
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{marginLeft:"auto",background:"#fff",border:"1px solid #E5E1DA",borderRadius:100,padding:"6px 13px",fontSize:12,fontFamily:"'DM Sans'",cursor:"pointer"}}>
          <option value="default">Recommended</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="savings-desc">Best Deals</option>
        </select>
      </div>

      {/* PRODUCTS */}
      {catOrder.map((cat,ci)=>{
        const items=groups[cat];
        const allDone=items.length>0&&items.every(p=>purchased.has(p.id));
        const isColl=collapsed.has(cat);
        const visible=isColl?items.filter(p=>starred.has(p.id)||purchased.has(p.id)):items;

        return <div key={cat} className="fu" style={{marginBottom:28,animationDelay:`${ci*.06}s`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,paddingBottom:8,borderBottom:"1px solid #E5E1DA",cursor:"pointer",userSelect:"none"}} onClick={()=>toggleColl(cat)}>
            <div style={{width:22,height:22,borderRadius:6,border:allDone?"2px solid #4A7C59":"2px solid #D5D0C8",background:allDone?"#4A7C59":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {allDone&&<span style={{color:"#fff",fontSize:11,fontWeight:700}}>{"\u2713"}</span>}
            </div>
            <span style={{fontSize:15}}>{CATS[cat]?.icon}</span>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:19,fontWeight:400,flex:1,textDecoration:allDone?"line-through":"none",color:allDone?"#6B6860":"#1A1A18"}}>{CATS[cat]?.label||cat}</h2>
            {allDone&&<span style={{fontSize:11,color:"#4A7C59",background:"#EDF5EF",padding:"2px 8px",borderRadius:100,fontWeight:600}}>Done</span>}
            <span style={{fontSize:11,color:"#6B6860",background:"#EDE9E3",padding:"2px 8px",borderRadius:100,fontWeight:500}}>{items.length}</span>
            <span style={{fontSize:13,color:"#6B6860",transition:"transform .2s",transform:isColl?"rotate(-90deg)":"rotate(0)"}}>{"\u25BE"}</span>
          </div>

          {isColl&&visible.length===0&&<div style={{padding:"10px 16px",fontSize:12,color:"#6B6860",fontStyle:"italic"}}>All items collapsed &mdash; click header to expand</div>}

          {visible.map(p=>{
            const hs=p.sp<p.p&&p.p>0;
            const isStar=starred.has(p.id);
            const isPurch=purchased.has(p.id);
            const isManual=p.src==="url";
            const tagS=p.live?{bg:"#FDE8E8",fg:"#C0392B"}:(TAG[p.t]||TAG.value);

            return <div key={p.id} className="card" style={{borderRadius:10,padding:"11px 14px",marginBottom:5,display:"flex",alignItems:"center",gap:0,boxShadow:"0 1px 2px rgba(0,0,0,.04)",opacity:isPurch?.45:1,borderLeft:isManual?"3px solid #C4A06A":"3px solid transparent"}}>

              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flexShrink:0,marginRight:11}}>
                <button onClick={(e)=>{e.preventDefault();e.stopPropagation();toggleStar(p.id);}} title="Favorite" style={{background:"none",border:"none",cursor:"pointer",fontSize:18,padding:0,lineHeight:1,color:isStar?"#C4A06A":"#D5D0C8"}}>{isStar?"\u2605":"\u2606"}</button>
                <button onClick={(e)=>{e.preventDefault();e.stopPropagation();togglePurch(p.id);}} title="Purchased" style={{background:isPurch?"#4A7C59":"none",border:isPurch?"2px solid #4A7C59":"2px solid #D5D0C8",borderRadius:4,width:16,height:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                  {isPurch&&<span style={{color:"#fff",fontSize:10,fontWeight:700}}>{"\u2713"}</span>}
                </button>
              </div>

              <a href={p.link||"#"} target="_blank" rel="noopener noreferrer" className="prow">
                <Thumb brand={p.b} cat={p.c} img={p.img}/>

                <div style={{flex:"1 1 130px",minWidth:90}}>
                  <div style={{fontWeight:500,fontSize:13,lineHeight:1.3}}>{p.n}</div>
                  <div style={{fontSize:11,color:"#6B6860",marginTop:1}}>
                    {p.b}
                    {isManual&&<span style={{marginLeft:5,fontSize:10,background:"#FFF8E7",color:"#B8860B",padding:"1px 6px",borderRadius:100,fontWeight:600}}>MANUALLY ADDED</span>}
                  </div>
                </div>

                <div style={{flex:"0 0 95px",minWidth:70}}>
                  {p.p>0?(hs?<><span style={{textDecoration:"line-through",color:"#6B6860",fontSize:11,fontFamily:"'JetBrains Mono'"}}>{fmt(p.p)}</span>{" "}<span style={{fontFamily:"'JetBrains Mono'",fontWeight:500,fontSize:13,color:"#C0392B"}}>{fmt(p.sp)}</span></>:<span style={{fontFamily:"'JetBrains Mono'",fontWeight:500,fontSize:13}}>{fmt(p.p)}</span>):<span style={{fontSize:11,color:"#6B6860",fontStyle:"italic"}}>TBD</span>}
                  {p.u&&<div style={{fontSize:10,color:"#6B6860"}}>{p.u}</div>}
                  {p.live&&<div style={{display:"inline-flex",fontSize:9,fontWeight:600,padding:"1px 5px",borderRadius:100,marginTop:2,background:"#FDE8E8",color:"#C0392B"}}>{"\u{1F534}"} LIVE</div>}
                  {!p.live&&p.sale&&hs&&<div style={{display:"inline-flex",fontSize:9,fontWeight:600,padding:"1px 5px",borderRadius:100,marginTop:2,background:"#FFF8E7",color:"#B8860B"}}>{"\u{1F7E1}"} {p.sale}</div>}
                </div>

                <div style={{flex:"0 0 75px"}}><span style={{padding:"2px 8px",borderRadius:100,fontSize:10,fontWeight:500,background:tagS.bg,color:tagS.fg,whiteSpace:"nowrap"}}>{p.tl}</span></div>

                <div style={{flex:"1 1 80px",fontSize:11,color:"#6B6860",minWidth:50}}>{p.m}</div>
                <div style={{flex:"1 1 90px",fontSize:11,color:"#6B6860",minWidth:50}}>{p.note}</div>

                <div style={{flexShrink:0,fontSize:15,color:"#C4A06A",opacity:.5}}>{"\u2197"}</div>
              </a>
            </div>;
          })}
        </div>;
      })}

      {/* ADD SECTION */}
      <div style={{background:"#fff",border:"1px solid #E5E1DA",borderRadius:10,padding:"16px 18px",marginBottom:32,boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:17,fontWeight:400}}>{showAdd?"Add Items":"Need something else?"}</h3>
          <button onClick={()=>setShowAdd(!showAdd)} style={{background:showAdd?"#EDE9E3":"#1A1A18",color:showAdd?"#1A1A18":"#fff",border:"none",borderRadius:100,padding:"6px 16px",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans'"}}>{showAdd?"Close":"+ Add"}</button>
        </div>

        {showAdd&&<div style={{marginTop:16}}>

          <div style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:600,color:"#6B6860",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{"\u{1F4CB}"} Add to Research Queue</div>
            <p style={{fontSize:12,color:"#6B6860",marginBottom:8}}>Add items you need and hit <strong>&#8635; Refresh</strong> in the header &mdash; it copies a prompt to your clipboard. Paste it into Claude Chat for research.</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <input value={qInput} onChange={e=>setQInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addToQueue()} placeholder={'"king bed pillows", "bath mat"...'} style={{flex:"1 1 220px",padding:"8px 12px",border:"1px solid #E5E1DA",borderRadius:8,fontSize:13,fontFamily:"'DM Sans'",background:"#F6F4F0"}}/>
              <select value={qCat} onChange={e=>setQCat(e.target.value)} style={{flex:"0 0 140px",padding:"8px 12px",border:"1px solid #E5E1DA",borderRadius:8,fontSize:13,fontFamily:"'DM Sans'",background:"#F6F4F0"}}>{Object.entries(CATS).map(([k,v])=><option key={k} value={k}>{v.icon} {v.label}</option>)}</select>
              <button onClick={addToQueue} disabled={!qInput.trim()} style={{background:"#1A1A18",color:"#fff",border:"none",borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans'"}}>+ Add</button>
            </div>
          </div>

          {subs.length>0&&<div style={{marginBottom:18,padding:14,background:"#F6F4F0",borderRadius:8}}>
            <div style={{fontSize:11,fontWeight:600,color:"#6B6860",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Queue ({subs.length})</div>
            {subs.map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 10px",background:"#fff",borderRadius:6,marginBottom:3,border:"1px solid #E5E1DA"}}>
              <span style={{fontSize:13}}><span style={{fontWeight:500}}>{s.query}</span> <span style={{fontSize:11,color:"#6B6860"}}>{CATS[s.category]?.icon} {CATS[s.category]?.label}</span></span>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:10,color:"#6B6860"}}>{new Date(s.date).toLocaleDateString()}</span>
                <button onClick={()=>removeSub(i)} style={{background:"none",border:"none",color:"#C0392B",cursor:"pointer",fontSize:14,padding:"0 2px"}}>{"\u00D7"}</button>
              </div>
            </div>)}
            <button onClick={doRefresh} style={{marginTop:8,background:"#1A1A18",color:"#fff",border:"none",borderRadius:100,padding:"8px 20px",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans'",display:"flex",alignItems:"center",gap:5}}>&#8635; Refresh &mdash; copy prompt to clipboard</button>
          </div>}

          <div style={{borderTop:"1px solid #E5E1DA",paddingTop:14}}>
            <div style={{fontSize:11,fontWeight:600,color:"#6B6860",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{"\u{1F517}"} Add by URL</div>
            <p style={{fontSize:12,color:"#6B6860",marginBottom:8}}>Found something you like? Paste the link. It&apos;ll show on the list with a gold marker.</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <input value={urlInput} onChange={e=>setUrlInput(e.target.value)} placeholder="https://..." style={{flex:"1 1 200px",padding:"8px 12px",border:"1px solid #E5E1DA",borderRadius:8,fontSize:13,fontFamily:"'DM Sans'",background:"#F6F4F0"}}/>
              <input value={urlNote} onChange={e=>setUrlNote(e.target.value)} placeholder="Note (optional)" style={{flex:"1 1 140px",padding:"8px 12px",border:"1px solid #E5E1DA",borderRadius:8,fontSize:13,fontFamily:"'DM Sans'",background:"#F6F4F0"}}/>
              <select value={urlCat} onChange={e=>setUrlCat(e.target.value)} style={{flex:"0 0 130px",padding:"8px 12px",border:"1px solid #E5E1DA",borderRadius:8,fontSize:13,fontFamily:"'DM Sans'",background:"#F6F4F0"}}>{Object.entries(CATS).map(([k,v])=><option key={k} value={k}>{v.icon} {v.label}</option>)}</select>
              <button onClick={addUrl} disabled={!urlInput.trim()} style={{background:"#1A1A18",color:"#fff",border:"none",borderRadius:8,padding:"8px 16px",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans'"}}>+ Add</button>
            </div>
          </div>
        </div>}
      </div>
    </div>

    <div style={{padding:"20px 0",borderTop:"1px solid #E5E1DA",textAlign:"center",fontSize:11,color:"#6B6860"}}>
      {"\u2605"} favorite &middot; {"\u2713"} purchased &middot; Click row to open &middot; &#8635; Refresh copies prompt to clipboard
    </div>
  </div>;
}
