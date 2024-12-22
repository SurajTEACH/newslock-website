import { useState } from "react"
import Layout from "./Layout"

const Products = ()=>{
    const [products, setProducts] = useState([
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/a.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 50,
            image: '/products/b.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/c.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/d.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/e.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/f.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/g.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/i.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/j.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/k.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/l.jpg'
        },
        {
            title: 'Men`s shirt blue denim',
            description: 'I am related to men`s product',
            price: 2000,
            discount: 15,
            image: '/products/a.jpg'
        }
    ])
    return (
        <Layout>
            <div>
                <h1 className="text-xl font-semibold mb-4">Products</h1>
                <div className="grid md:grid-cols-4 gap-8">
                    {
                        products.map((item, index)=>(
                            <div key={index} className="bg-white rounded-md shadow-lg">
                                <img 
                                    src={item.image}
                                    className="rounded-t-md w-full h-[270px] object-cover"
                                />
                                <div className="p-4">
                                    <h1 className="font-semibold text-md">{item.title}</h1>
                                    <p className="text-gray-600">{item.description.slice(0,50)}</p>
                                    <div className="flex gap-2 mt-1">
                                        <label>₹{item.price-(item.price*item.discount)/100}</label>
                                        <del className="font-semibold">₹{item.price}</del>
                                        <label className="text-gray-600">({item.discount}% Off)</label>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Products;