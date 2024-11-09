
export default function SortProductList() {
  return (
    <div className="bg-gray-300/40 py-4 px-3">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div>Sort by</div>
          <button className="h-8 bg-shopee_orange px-4 text-white text-sm rounded-sm hover:bg-shopee_orange/80 text-center capitalize">Popular</button>
          <button className="h-8 bg-white px-4 text-black text-sm rounded-sm hover:bg-slate-100 text-center capitalize">Latest</button>
          <button className="h-8 bg-white px-4 text-black text-sm rounded-sm hover:bg-slate-100 text-center capitalize">Top Sales</button>
          <select name="" id="" className="h-8 bg-white px-4 text-black text-sm rounded-sm hover:bg-slate-100 text-left capitalize outline-none">
            <option value="" disabled>Price</option>
            <option value="asc" >Price: Low To High</option>
            <option value="desc" >Price: High To Low</option>
          </select>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-shopee_orange">1</span>
            <span>/2</span>
          </div>
          <div className="ml-2">
            <button className="px-3 h-8 bg-white/60 rounded-sm rounded-tl-sm rounded-bl-sm hover:bg-slate-100 cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button className="px-3 h-8 bg-white/60 rounded-sm rounded-tr-sm rounded-br-sm hover:bg-slate-100 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
