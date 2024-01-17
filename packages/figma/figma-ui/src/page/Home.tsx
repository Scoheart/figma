import { FC } from 'react';
import yidSvg from '../public/yid.svg';

const Home: FC = () => {
  return (
    <div className="flex flex-col w-360 h-full pt-8 bg-gray-50">
      <div className="flex items-center justify-center gap-1">
        <img src={yidSvg} alt="logo" className="w-12 h-12" />
        <div className="relative text-xl font-serif font-bold">
          Netdisk D2C
          <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Netdisk D2C
          </span>
        </div>
      </div>
      <div className="m-6 text-gray-400">
        Let's convert your{' '}
        <span className=" text-black font-bold">Designs to Code</span>
      </div>
      <div className="grid grid-cols-2 gap-6 mx-4">
        <div className="p-8 shadow-md rounded-lg bg-white text-center grid-item hover:bg-gray-100 transition  hover:cursor-pointer">
          <div>图层检查</div>
        </div>
        <div className="p-8 shadow-md rounded-lg bg-white text-center grid-item hover:bg-gray-100 transition hover:cursor-pointer">
          <div>容器组件</div>
        </div>
        <div className="p-8 shadow-md rounded-lg bg-white text-center grid-item hover:bg-gray-100 transition hover:cursor-pointer">
          <div>节点标记</div>
        </div>
        <div className="p-8 shadow-md rounded-lg bg-white text-center grid-item hover:bg-gray-100 transition hover:cursor-pointer">
          <div>数据绑定</div>
        </div>
        <div className="p-8 shadow-md rounded-lg bg-white text-center grid-item hover:bg-gray-100 transition hover:cursor-pointer">
          <div>事件标记</div>
        </div>
        <div className="p-8 shadow-md rounded-lg bg-white text-center grid-item hover:bg-gray-100 transition hover:cursor-pointer">
          <div>转码D2C</div>
        </div>
      </div>

      {/* <Button onClick={pushServer}>开始转码</Button> */}
    </div>
  );
};

export default Home;
