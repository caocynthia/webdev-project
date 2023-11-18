import MovieItem from "../MovieItem";

function Results(props) {
  return props.s.map((item, index) => (
    <MovieItem key={index} title={item.Title} />
  ));
}
export default Results;
