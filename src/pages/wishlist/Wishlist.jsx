import "./Wishlist.css";
import WishlistItem from "./components/wishlistItem/WishlistItem";
import { useUser } from "../../hooks/useUser";
import { GiHamburgerMenu } from "react-icons/gi";
import { act, useEffect, useState } from "react";
import CreateWishlistModal from "../../components/modals/create_wishlist_modal/CreateWishlistModal";
import { HiDotsHorizontal } from "react-icons/hi";
import ManageWishlistModal from "../../components/modals/manage_wishlist_modal/ManageWishlistModal";
import { useWishlist } from "../../hooks/useWishlist";
import WishlistActionMenu from "./components/wishlist-action-menu/WishlistActionMenu";
import EmptyList from "./components/empty-list/EmptyList";
import { fetchProducts } from "../../services/ProductService";
import { toast } from "react-toastify";
import WishlistItemLoader from "./components/wishlist-item-loader/WishlistItemLoader";

const WishListSidebar = () => {
  const {
    user: { wishlists },
  } = useUser();
  const { activeList, setActiveList } = useWishlist();

  const sortedWishlists = [...wishlists].sort(
    (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)
  );

  return (
    <aside>
      {sortedWishlists.map((wishlist) => {
        return (
          <div
            onClick={() => setActiveList(wishlist._id)}
            key={wishlist._id}
            style={{
              background:
                wishlist._id === activeList ? "whitesmoke" : "",
              border:wishlist._id===activeList?"1px solid #bbbbbb":"1px solid transparent"
            }}
          >
            <strong>{wishlist.listName}</strong>
            {wishlist.isDefault && <p>default list</p>}
          </div>
        );
      })}
    </aside>
  );
};

const WishlistContent = () => {
  const { activeList } = useWishlist();
  const [showMenu, setShowMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    user: { wishlists },
  } = useUser();

  const activeListDetail = wishlists.find(
    (wishlist) => wishlist._id === activeList
  );

  const getProductDetails = async () => {
    const productIds =
      activeListDetail?.items.map((item) => item.product) || [];
    if (productIds.length === 0) return setProducts([]);
    try {
      setLoading(true);
      const data = await fetchProducts(productIds, [
        "title",
        "category",
        "averageRatings",
        "price",
        "artist",
        "productImages",
      ]);
      setProducts(data);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [activeList]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="wishlist-content">
      <section id="hero">
        <h4>{activeListDetail?.listName}</h4>
        <button
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
          className="secondary-btn all-centered"
        >
          <HiDotsHorizontal />
          {showMenu && <WishlistActionMenu />}
        </button>
      </section>

      <header>
        <div>
          <button>
            <GiHamburgerMenu />
          </button>
        </div>
        <div>
          <input
            type="search"
            placeholder="Search this list"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <main id="wishlist-item-wrapper">
          <WishlistItemLoader count={activeListDetail.items.length} />
        </main>
      ) : filteredProducts.length === 0 ? (
        <EmptyList />
      ) : (
        <main id="wishlist-item-wrapper">
  {activeListDetail?.items.length === 0 ? (
    <EmptyList />
  ) : (
    activeListDetail.items
      .filter((item) =>
        products.map((p) => p._id).includes(item.product)
      )
      .map((item) => {
        const product = products.find((p) => p._id === item.product);
        return (
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
            <WishlistItem
              key={product._id}
              product={product}
              activeListId={activeList}
            />
          )
        );
      })
  )}
</main>

      )}
    </div>
  );
};

const Wishlist = () => {
  const {
    user: { wishlists },
  } = useUser();
  const { setActiveList, openModal, activeModal, closeModal, activeList } =
    useWishlist();

  const initialActiveList = wishlists.find(
    (wishlist) => wishlist.isDefault
  )._id;

  const openCreateWishlistModal = (e) => {
    e.stopPropagation();
    openModal("CREATE_LIST");
  };

  useEffect(() => {
    setActiveList(initialActiveList);
  }, []);

  return (
    <div id="wishlist-page">
      {activeModal === "CREATE_LIST" && (
        <CreateWishlistModal closeModal={closeModal} />
      )}
      {activeModal === "MANAGE_LIST" && (
        <ManageWishlistModal closeModal={closeModal} />
      )}
      <div id="wishlist-wrapper">
        <header>
          <h2>Your Wishlist</h2>
          <button
            onClick={openCreateWishlistModal}
            className="secondary-text-btn"
          >
            Create a List
          </button>
        </header>
        <main>
          <WishListSidebar />
          <WishlistContent />
        </main>
      </div>
    </div>
  );
};

export default Wishlist;
