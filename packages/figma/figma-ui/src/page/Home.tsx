import { FC } from 'react';
import yidSvg from '../../public/yid.svg';
import lockSvg from '../../public/lock.svg';
import starSvg from '../../public/star.svg';
type propsType = {
  setShowHome: Function;
};

const Home: FC<propsType> = ({ setShowHome }) => {
  return (
    <>
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
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 mx-4">
        <div
          className="border hover:border-blue-300 w-40 h-20 shadow-md rounded-lg flex justify-center items-center gap-2 bg-white text-center grid-item  transition hover:cursor-pointer"
          onClick={() => {
            setShowHome((prev: any) => !prev);
          }}
        >
          <div className="w-10 h-10">
            <img src={starSvg} alt="star" />
          </div>
          <div>元素导出</div>
        </div>
        <div className="w-40 h-20 shadow-md rounded-lg flex justify-center items-center gap-2  text-center grid-item  bg-gray-100 transition hover:cursor-pointer">
          <div className="w-10 h-10">
            <img src={lockSvg} alt="lock" />
          </div>
          <div>更新检查</div>
        </div>
        <div className="w-40 h-20 shadow-md rounded-lg flex justify-center items-center gap-2  text-center grid-item bg-gray-100 transition hover:cursor-pointer">
          <div className="w-10 h-10">
            <img src={lockSvg} alt="lock" />
          </div>
          <div>自动修正</div>
        </div>
        <div className="w-40 h-20 shadow-md rounded-lg flex justify-center items-center gap-2  text-center grid-item bg-gray-100 transition hover:cursor-pointer">
          <div className="w-10 h-10">
            <img src={lockSvg} alt="lock" />
          </div>
          <div>交互标注</div>
        </div>
        <div className="w-40 h-20 shadow-md rounded-lg flex justify-center items-center gap-2  text-center grid-item bg-gray-100 transition hover:cursor-pointer">
          <div className="w-10 h-10">
            <img src={lockSvg} alt="lock" />
          </div>
          <div>组件标注</div>
        </div>
        <div className="w-40 h-20 shadow-md rounded-lg flex justify-center items-center gap-2  text-center grid-item bg-gray-100 transition hover:cursor-pointer">
          <div className="w-10 h-10">
            <img src={lockSvg} alt="lock" />
          </div>
          <div>准出校验</div>
        </div>
      </div>
    </>
  );
};

export default Home;
