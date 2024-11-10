import { Link } from "react-router-dom";

export default function Product() {
  return (
    <Link to={''}>
      <div className="bg-white shadow hover:shadow-sm hover:-translate-y-[-0.04rem] transition-transform duration-100 overflow-hidden">
        <div className="relative w-full pt-[100%]">
          <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lza8qqegw3oh70_tn.webp"
            alt="anh"
            className="absolute top-0 left-0 bg-white w-full h-full object-cover" />
        </div>
        <div className="p-2 overflow-hidden">
          <div className="line-clamp-2 min-h-[2rem] text-xs">
            Tai Nghe Mèo Bluetooth P47M, Tai Mèo Dễ Thương Có Mic, Âm Bass Mạnh Mẽ Nghe Nhạc Cực Hay Bảo Hành 1 Năm
          </div>
          <div className="flex items-center mt-3 gap-1.5">
            <div className="line-through max-w-[50%] text-gray-500 truncate">
              <span className="text-xs">₫</span>
              <span>10000</span>
            </div>
            <div className="text-shopee_orange ">
              <span className="text-xs">₫</span>
              <span>3000</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-start">
            <div className="flex items-center">
              <div className="relative">
                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" className="w-3 h-3 fill-yellow-400 overflow-hidden top-[-6px] left-0 "><polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></polygon></svg>
              </div>
            </div>
            <div className="ml-1.5 text-sm">5.6k Sold</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
