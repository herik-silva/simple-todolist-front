import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

img {
  user-select: none;
  -webkit-user-drag: none;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
   background-color: #F6F8Fa;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #6b7787;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #94a5bb; 
}
`
export default GlobalStyle;