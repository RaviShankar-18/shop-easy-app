import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/headers/Header";
import useFetch from "../hooks/useFetch";

function Home() {
  const { data, loading, error } = useFetch(
    "https://shop-easy-apis.vercel.app/api/categories"
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      id: 1,
      title: "Summer Collection",
      description: "Get ready for summer with our latest collection",
      image:
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      link: "/products",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our freshest products",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      link: "/products",
    },
    {
      id: 3,
      title: "Special Offers",
      description: "Limited time discounts on select items",
      image:
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      link: "/products",
    },
  ];

  const categoryImages = {
    men: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    women:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    kids: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    electronics:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    "home decor":
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    home: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    unisex:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    accessories:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    footwear:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  };

  const getCategoryImage = (category) => {
    const normalizedCategory = category.toLowerCase();
    return (
      categoryImages[normalizedCategory] ||
      `https://placehold.co/600x400?text=${normalizedCategory}`
    );
  };

  const AllCategories = data?.data?.categories?.map(
    (product) => product.category
  );
  const uniqueCategories = [...new Set(AllCategories)];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>
      <Header />

      <div className="carousel-container position-relative mb-5">
        <div className="carousel-inner">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${
                index === currentSlide ? "active" : ""
              }`}
              style={{
                display: index === currentSlide ? "block" : "none",
              }}
            >
              <div className="position-relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="d-block w-100"
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
                <div className="carousel-caption bg-dark bg-opacity-50 p-3 p-md-5 rounded">
                  <h2 className="display-6 fw-bold">{item.title}</h2>
                  <p className="d-none d-md-block">{item.description}</p>
                  <div className="text-center mt-3">
                    <Link to={item.link} className="btn btn-primary">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          onClick={prevSlide}
        >
          <span
            className="carousel-control-prev-icon bg-dark rounded p-2"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={nextSlide}
        >
          <span
            className="carousel-control-next-icon bg-dark rounded p-2"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>

        <div className="carousel-indicators position-absolute bottom-0 mb-3">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`rounded-circle ${
                index === currentSlide ? "active" : ""
              }`}
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: index === currentSlide ? "#0d6efd" : "#dee2e6",
              }}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Shop By Category</h2>

        {loading && (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error.message}
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {uniqueCategories &&
            uniqueCategories.map((category) => (
              <div key={category} className="col-6 col-md-4 col-lg-3">
                <Link
                  to={`/products/${category}`}
                  className="text-decoration-none"
                >
                  <div className="card h-100 border-0 shadow-sm hover-card">
                    <div
                      className="card-img-wrapper rounded-top overflow-hidden position-relative"
                      style={{ height: "220px" }}
                    >
                      <img
                        src={getCategoryImage(category)}
                        className="card-img-top w-100 h-100"
                        alt={category}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title text-dark mb-0 text-capitalize">
                        {category}
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>

      <div className="container mb-5 mt-5">
        <h2 className="text-center mb-4 fw-bold">Browse Our Collections</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="position-relative overflow-hidden rounded hover-card">
              <img
                src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Trending Now"
                className="w-100"
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-3">
                <h4 className="mb-2">Trending Now</h4>
                <p className="d-none d-md-block">
                  Discover this season's hottest styles
                </p>
                <Link
                  to="/products/trending"
                  className="btn btn-sm btn-primary"
                >
                  View Collection
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="position-relative overflow-hidden rounded hover-card">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Essentials"
                className="w-100"
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-3">
                <h4 className="mb-2">Essentials</h4>
                <p className="d-none d-md-block">
                  Timeless pieces for your wardrobe
                </p>
                <Link
                  to="/products/essentials"
                  className="btn btn-sm btn-primary"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="position-relative overflow-hidden rounded hover-card">
              <img
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Accessories"
                className="w-100"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-3">
                <h5 className="mb-1">Accessories</h5>
                <Link
                  to="/products/accessories"
                  className="btn btn-sm btn-primary"
                >
                  Shop
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="position-relative overflow-hidden rounded hover-card">
              <img
                src="https://images.unsplash.com/photo-1513094735237-8f2714d57c13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Footwear"
                className="w-100"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-3">
                <h5 className="mb-1">Footwear</h5>
                <Link
                  to="/products/footwear"
                  className="btn btn-sm btn-primary"
                >
                  Shop
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="position-relative overflow-hidden rounded hover-card">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Outlet"
                className="w-100"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-3">
                <h5 className="mb-1">Outlet</h5>
                <Link to="/products/outlet" className="btn btn-sm btn-primary">
                  Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Add this CSS to your global styles or a style tag */}
      <style>
        {`
          .carousel-container {
            position: relative;
            overflow: hidden;
          }
          
          .carousel-caption {
            position: absolute;
            bottom: 20%;
            left: 10%;
            right: 10%;
            max-width: 600px;
            margin: 0 auto;
          }
          
          @media (max-width: 768px) {
            .carousel-caption {
              bottom: 10%;
              padding: 10px !important;
            }
            .carousel-caption h2 {
              font-size: 1.5rem;
            }
          }
          
          .carousel-control-prev, .carousel-control-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: auto;
            padding: 10px;
            border: none;
            background: transparent;
            cursor: pointer;
          }
          
          .carousel-control-prev {
            left: 15px;
          }
          
          .carousel-control-next {
            right: 15px;
          }
          
          .carousel-indicators {
            display: flex;
            gap: 8px;
            justify-content: center;
            left: 0;
            right: 0;
            margin: 0 auto;
          }
          
          .hover-card {
            transition: all 0.3s ease;
          }
          
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          }
        `}
      </style>
    </>
  );
}

export default Home;
