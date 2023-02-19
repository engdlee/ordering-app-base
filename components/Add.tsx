import {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent,
} from 'react';
import axios from 'axios';
import { IExtraOption } from '@interfaces/IExtraOption';

type Props = {
  setClose: Dispatch<SetStateAction<Boolean>>;
};

const Add = ({ setClose }: Props) => {
  const [file, setFile] = useState<string | Blob | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [prices, setPrices] = useState<number[]>([]);
  const [extraOptions, setExtraOptions] = useState<IExtraOption[]>([]);
  const [extra, setExtra] = useState<{} | null>(null);

  const changePrice = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const currentPrices = prices;
    currentPrices[index] = parseInt((e.target as HTMLInputElement).value, 10);
    setPrices(currentPrices);
  };

  const handleExtraInput = (e: ChangeEvent<HTMLInputElement>) => {
    setExtra({
      ...extra,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const handleExtra = () => {
    console.log(extraOptions);
    setExtraOptions((prev) => [...prev, extra as IExtraOption]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    if (file !== null) {
      data.append('file', file);
    }
    data.append('upload_preset', 'uploads');
    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dsbyq4sj1/image/upload',
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post('http://localhost:3000/api/products', newProduct);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-white/50 fixed top-0 z-20 flex items-center justify-center">
      <div className="w-[500px] bg-white px-12 py-2 flex flex-col justify-between relative rounded-xl shadow-md border border-gray-300">
        <span
          onClick={() => setClose(true)}
          className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer absolute -top-3 -right-3"
        >
          X
        </span>
        <h1 className="font-bold text-4xl my-5">Add a new Pizza</h1>
        <div className="flex flex-col mb-3">
          <label className="mb-1 text-sm font-medium">Choose an image</label>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-1 text-sm font-medium">Title</label>
          <input
            className="border-b border-b-gray-400 outline-none"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-1 text-sm font-medium">Desc</label>
          <textarea
            className="border border-gray-400 outline-none"
            rows={4}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-1 text-sm font-medium">Prices</label>
          <div className="flex justify-between">
            <input
              className={`border-b border-b-gray-400 outline-none w-1/4`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`border-b border-b-gray-400 outline-none w-1/4`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`border-b border-b-gray-400 outline-none w-1/4`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-1 text-sm font-medium">Extra</label>
          <div className="flex justify-between">
            <input
              className={`border-b border-b-gray-400 outline-none w-1/4`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`border-b border-b-gray-400 outline-none w-1/4`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button
              className="border border-gray-400 bg-gray-300 px-8"
              onClick={handleExtra}
            >
              Add
            </button>
          </div>
          <div className="my-3 flex flex-wrap">
            {extraOptions.map((option) => (
              <span
                key={option.text}
                className="p-1 text-sm border border-red-500 text-red-500 mr-3 rounded-xl cursor-pointer"
              >
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button
          className="w-1/4 bg-teal-600 text-white font-semibold cursor-pointer py-1 self-end mb-5"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
