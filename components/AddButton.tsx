import { Dispatch, SetStateAction } from 'react';

type Props = {
  setClose: Dispatch<SetStateAction<Boolean>>;
};

const AddButton = ({ setClose }: Props) => {
  return (
    <div
      onClick={() => setClose(false)}
      className="p-2 m-5 bg-red-500 w-40 rounded-xl text-white font-medium text-center cursor-pointer"
    >
      Add New Pizza
    </div>
  );
};

export default AddButton;
