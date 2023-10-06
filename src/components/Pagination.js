import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";



const Pagination = () => {

  const iconStyleLeft = {
    fontSize: "52px", // Adjust the size
    color: "black",   // Change the color
    marginRight: "40px", // Add spacing
  };
  
  const iconStyleRight = {
    fontSize: "52px", // Adjust the size
    color: "black",   // Change the color
    marginLeft: "40px", // Add spacing
  }


  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = useCallback(async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=4&skip=${page * 4 - 4}`
    );
    const data = await res.json();

    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      <div className="page__heading">
        <h1> Implementation Pagination </h1>
      </div> 
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <div className="span_one">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            <FontAwesomeIcon icon={faChevronLeft} style={iconStyleLeft}/>
          </span>
          </div>

          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
              {/* {i+1} */}
              </span>
            );
          })}
          <div className="spantwo">
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disable"}
          >
            <FontAwesomeIcon icon={faChevronRight} style={iconStyleRight}/>
          </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pagination;
