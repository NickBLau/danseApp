import { FiHome, FiUser, FiSearch, FiCalendar } from "react-icons/fi";

import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const StyledList = tw.li`
w-10 h-10 flex items-center justify-center border border-black border-solid rounded-full

`;
const NavComponent = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  console.log(loggedIn);
  return (
    <>
      <nav className="bg-white flex w-full bottom-0 fixed h-16">
        <ul className="flex  w-full h-16 items-center justify-around">
          <Link to="/Activity">
            <StyledList>
              <FiHome className="text-2xl " />
            </StyledList>
          </Link>

          <Link to="/Search">
            <StyledList>
              <FiSearch className="text-2xl " />
            </StyledList>
          </Link>
          {loggedIn ? (
            <Link to="/Calendar">
              <StyledList>
                <FiCalendar className="text-2xl " />
              </StyledList>
            </Link>
          ) : (
            <Link to="/Login">
              <StyledList>
                <FiUser className="text-2xl " />
              </StyledList>
            </Link>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavComponent;
