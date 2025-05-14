import { useEffect, useState } from 'react';
import Select from 'react-select';

const pageSizes = [10, 20, 30, 40, 50].map(item => ({
  value: item,
  label: `Show ${item} records`,
}));

//display 10 numbers
//example 1,2,3,4,5,6,7,8, ..., 23
//example 8,...,9,10,11,12,13,14,16, ... , 23
//example 16,..., 17,18,19,20 ,21,22,23
//each time show 10 pages button
//more then meaning put ... click on it get next to current

const Pagination = ({ page, pageCount, pageSize, gotoPage, setPageSize }) => {
  const [lcPageSize, setLcPageSize] = useState({
    value: 10,
    label: 'Show 10 records',
  });

  useEffect(() => {
    const found = pageSizes.find(item => Number(item.value) === pageSize);
    if (found) {
      setLcPageSize(found);
    }
  }, [pageSize]);

  const renderPageButtons = () => {
    const pageButtons = [];
    let pageItems = 8;
    let pageLastItem = 0;
    if (pageItems < pageCount - 2) {
      const pageRow = Math.ceil(page / pageItems);
      pageLastItem = pageRow * pageItems; //- (pageRow === 1 ? 0 : 1);
      if (pageLastItem > pageCount) {
        pageItems = pageLastItem - pageCount;
        pageLastItem = pageCount;
      }
      //   console.log("PageRow", pageRow, pageLastItem, pageCount);
    } else {
      pageLastItem = pageCount;
      pageItems = pageCount;
    }

    //print prev button pages
    for (let i = 0, itemNum = pageLastItem; i < pageItems; i++) {
      //   console.log("Page Item ", itemNum);
      pageButtons.push(String(itemNum));
      itemNum = itemNum - 1;
    }
    pageButtons.reverse();

    if (Number(pageButtons[0]) > 1) {
      pageButtons.splice(
        0,
        1,
        String(Number(pageButtons[0]) - 1),
        pageButtons[0],
      );
    }

    if (pageCount - pageLastItem > 2) {
      // print next to last with dot else number itself
      pageButtons.push('...');
      pageButtons.push(String(pageCount));
    } else {
      // print next two items
      for (let i = pageLastItem + 1; i <= pageCount; i++) {
        pageButtons.push(String(i));
      }
    }

    return pageButtons.map((item, index) => (
      <button
        type="button"
        key={item}
        className={`w-[32px] h-[32px] border rounded  hover:bg-blue-500 hover:text-white text-sm  ${
          item === String(page)
            ? 'bg-blue-500 text-white'
            : 'bg-white text-kps-grey-600'
        }`}
        onClick={() => {
          const pageNum = Number(
            item === '...' ? Number(pageButtons[index - 1]) + 1 : item,
          );
          gotoPage(pageNum - 1);
        }}
      >
        {item}
      </button>
    ));
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-1 justify-center items-center">
        {renderPageButtons()}
      </div>
      <div className="text-kps-grey-500">
        <Select
          options={pageSizes}
          value={lcPageSize}
          menuPlacement="auto"
          menuPortalTarget={document.body}
          enableCustomSearch={false}
          onChange={val => setPageSize(val.value)}
        />
      </div>
    </div>
  );
};

export default Pagination;
