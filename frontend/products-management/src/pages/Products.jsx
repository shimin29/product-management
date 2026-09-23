import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router";
import ProductModal from "../components/ProductModal";
import api from "../utils/api";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const userToken = localStorage.getItem("token");
                // console.log(userToken);
                if (userToken == null) throw new Error("User Token is unavailable");

                const response = await axios.get("http://localhost:3000/products", {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                // console.log(error);
                localStorage.removeItem("token");
                navigate("/");
            }
        };
        getAllProducts();
    }, []);

    useEffect(() => {
        // console.log(products);
    }, [products]);

    const onLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleOpenAddForm = () => {
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenEditForm = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleAddSave = async (payload) => {
        try {
            if (currentProduct == null) {
                const response = await api.post("/products", payload, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(response.data);
                setProducts([...products, response.data]);
            } else {
                const response = await api.patch(`/products/${currentProduct._id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(response.data);
                const updatedProducts = products.map((product) => {
                    if (product._id == currentProduct._id) {
                        return response.data;
                    } else return product;
                });
                setProducts(updatedProducts);
            }
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to add product. Please check your connection.");
        }
    };

    const deleteProduct = async (id) => {
        try {
            const userToken = localStorage.getItem("token");
            await api.delete(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please check your connection!");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-slate-50 flex flex-col">
                {/* Top Management Header */}
                <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Inventory Management</h1>
                            <p className="text-xs text-slate-500 mt-0.5">Manage details, categories, and pricing for {products.length} listed items.</p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Create Trigger */}
                            <button onClick={handleOpenAddForm} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add Product
                            </button>

                            <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-xl transition-all duration-150 bg-white hover:bg-red-50">
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Admin Space */}
                <main className="p-6 flex-1">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} onEdit={handleOpenEditForm} onDelete={deleteProduct} />
                        ))}
                    </div>
                </main>
            </div>
            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddSave} editingProduct={currentProduct} />
        </>
    );
}
