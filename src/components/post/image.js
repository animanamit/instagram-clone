import { PropTypes } from "prop-types";

export default function Image({ caption, src }) {
  return <img src={src} alt={caption} />;
}

Image.propType = {
  src: PropTypes.string,
  caption: PropTypes.string
};
