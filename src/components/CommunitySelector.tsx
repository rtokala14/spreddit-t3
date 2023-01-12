import { type Dispatch, type SetStateAction, useState } from "react";
import { api } from "../utils/api";

const CommunitySelector = ({
  selectedCommunity,
  setSelectedCommunity,
  setSubId,
}: {
  selectedCommunity: string;
  setSelectedCommunity: Dispatch<SetStateAction<string>>;
  setSubId: Dispatch<SetStateAction<string>>;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [ishover, setIsHover] = useState(false);
  const [isSubFocus, setIsSubFocus] = useState(false);
  const [selected, setSelected] = useState(false);
  const { data: subs, isLoading } = api.posts.fetchSubreddits.useQuery({
    subName: searchValue,
  });

  const subData = subs?.flatMap((sub) => sub.name);

  // console.log("Hover", ishover);

  // console.log(searchValue);

  // console.log(subData);

  return (
    <>
      <div className=" mt-4 flex w-fit items-center gap-3 rounded-md py-2 pr-2 text-white">
        <label>Select Community:</label>
        <input
          value={searchValue}
          type={"text"}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onFocus={() => setIsSubFocus(true)}
          onBlur={(e) => {
            if (!ishover) setIsSubFocus(false);
          }}
          className=" relative rounded-md bg-gray-800 p-2 text-white"
        />
      </div>
      {isSubFocus ? (
        <ul
          onPointerEnter={() => setIsHover(true)}
          onPointerLeave={() => setIsHover(false)}
          className=" absolute right-14 w-56 rounded-md border bg-gray-800 p-2 text-white"
        >
          {!isLoading ? (
            subs && subs.length > 0 ? (
              subs.map((sub) => (
                <li
                  key={sub.id}
                  onClick={() => {
                    setIsHover(false);
                    setSelectedCommunity(sub.name);
                    setSelected(true);
                    setSearchValue(sub.name);
                    setSubId(sub.id);
                    setIsSubFocus(false);
                  }}
                  className=" rounded-sm p-1 hover:cursor-pointer hover:outline hover:outline-1"
                >
                  {`s/${sub.name}`}
                </li>
              ))
            ) : (
              <li className=" animate-pulse rounded-sm p-1">
                Oops... {`\n`} create Community first?
              </li>
            )
          ) : (
            <li className=" animate-pulse rounded-sm p-1">Loading...</li>
          )}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};

export default CommunitySelector;
