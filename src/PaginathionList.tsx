import { FC, useEffect, useState } from "react";
import "./css/paginathion.css";

interface IPaginathion {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageValue: number;
  maxLimit: number;
}

const Paginathion: FC<IPaginathion> = ({ setPage, pageValue, maxLimit }) => {
  const limit = 10;
  const [pages, setPages] = useState<number[]>([]);

  const createPages = () => {
    console.log(maxLimit,"max")
    if(maxLimit == 0 ) {
      setPages([]);
    }else{
      let page = maxLimit / limit;
      page = Math.ceil(page);
      setPages([...new Array(page).fill(0).map((_, i) => i + 1)]);
    }
 
  };

  useEffect(() => {
    createPages();
  }, [maxLimit]);

  return (
    <>
      <div className="page_container">
        {pages.map((page) => (
          <div
            className={pageValue == page ? "page_block active" : "page_block"}
            key={page + "i"}
            onClick={() => {
              setPage(page);
            }}
          >
            {page}
          </div>
        ))}
      </div>
    </>
  );
};

export default Paginathion;
