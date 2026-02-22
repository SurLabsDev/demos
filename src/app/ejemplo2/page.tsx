import { ShoppingBag, Search, Menu, ArrowRight, Heart } from "lucide-react";

export default function EcommercePage() {
    const products = [
        { id: 1, name: "RELOJ AURA CHRONOGRAPH", price: "$1,250", category: "Relojería", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" },
        { id: 2, name: "ESENCIA N° 5", price: "$185", category: "Fragancias", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" },
        { id: 3, name: "BOLSO SEDA MINIMAL", price: "$420", category: "Accesorios", image: "https://images.unsplash.com/photo-1579621970221-72909f187317?auto=format&fit=crop&q=80&w=800" },
        { id: 4, name: "MALETÍN NOIR LUXE", price: "$890", category: "Marroquinería", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800" },
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#FAFAFA]">
            {/* Announcement Bar */}
            <div className="bg-[#111111] text-[#FAFAFA] text-xs font-medium tracking-widest text-center py-2 uppercase">
                Envío global de cortesía en compras superiores a $500
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E5E5E5]">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6 hidden md:flex text-sm tracking-widest uppercase font-medium">
                        <a href="#" className="hover:text-gray-500 transition-colors">Colección</a>
                        <a href="#" className="hover:text-gray-500 transition-colors">Diario</a>
                        <a href="#" className="hover:text-gray-500 transition-colors">Atelier</a>
                    </div>

                    <button className="md:hidden">
                        <Menu size={20} />
                    </button>

                    <a href="#" className="text-2xl font-serif tracking-widest font-bold">
                        AESTHÈTE
                    </a>

                    <div className="flex items-center gap-5">
                        <button className="hover:opacity-60 transition-opacity"><Search size={20} className="stroke-[1.5]" /></button>
                        <button className="hover:opacity-60 transition-opacity hidden sm:block"><Heart size={20} className="stroke-[1.5]" /></button>
                        <button className="hover:opacity-60 transition-opacity relative">
                            <ShoppingBag size={20} className="stroke-[1.5]" />
                            <span className="absolute -top-1 -right-2 bg-[#111111] text-[#FAFAFA] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                                2
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            <main>
                {/* Editor's Pick / Hero Split */}
                <section className="relative h-[85vh] min-h-[600px] flex flex-col md:flex-row">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 h-full relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#EFEFEF] animate-pulse -z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1618354691438-25af04a51118?auto=format&fit=crop&q=80&w=1200"
                            alt="Editorial presentation"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[2s] ease-out mix-blend-multiply"
                        />
                    </div>

                    {/* Content Side - High Conversion Focus */}
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-20 py-20 bg-[#F0EFEB]">
                        <p className="text-xs tracking-[0.2em] font-medium uppercase text-gray-500 mb-6">Objeto de Deseo</p>
                        <h1 className="text-5xl md:text-6xl font-serif leading-[1.1] mb-8">
                            La Arquitectura<br />de la Forma.
                        </h1>
                        <p className="text-gray-600 max-w-md mb-12 text-sm leading-relaxed">
                            Elaborada con precisión milimétrica, nuestra más reciente colección desafía los límites entre la utilidad cotidiana y el arte escultural. Unidades limitadas disponibles.
                        </p>
                        <div>
                            <button className="group inline-flex items-center justify-center gap-4 bg-[#111111] text-[#FAFAFA] hover:bg-gray-800 transition-colors text-sm tracking-widest uppercase font-medium px-8 py-4">
                                Comprar Colección
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Curated Selection */}
                <section className="py-32 px-6 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <h2 className="text-3xl font-serif mb-4">Selección Curada</h2>
                            <p className="text-gray-500 text-sm max-w-sm">Eleva tu día a día con piezas atemporales diseñadas para perdurar más allá de cualquier temporada.</p>
                        </div>
                        <a href="#" className="inline-block text-xs uppercase tracking-widest font-medium border-b border-[#111111] pb-1">Ver Catálogo</a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {products.map((product) => (
                            <div key={product.id} className="group cursor-pointer">
                                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#EFEFEF]">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-[#111111] text-[#FAFAFA] text-xs uppercase tracking-widest py-3 px-6 whitespace-nowrap">
                                        Añadir al Bolso
                                    </button>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{product.category}</span>
                                    <h3 className="text-sm font-medium tracking-wide mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-600 font-medium">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Brand Story block */}
                <section className="py-24 bg-[#111111] text-[#FAFAFA] text-center px-6">
                    <div className="max-w-2xl mx-auto">
                        <span className="block mb-6"><ShoppingBag size={24} className="mx-auto stroke-[1]" /></span>
                        <h2 className="text-3xl font-serif mb-8 leading-tight">Lujo silencioso confeccionado para el minimalista exigente.</h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10">
                            Obtenemos únicamente los materiales más excepcionales, trabajando íntimamente con maestros artesanos para crear obras de calidad inquebrantable que te acompañarán de por vida.
                        </p>
                        <button className="text-xs uppercase tracking-widest px-8 py-4 border border-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#111111] transition-colors">
                            Nuestra Historia
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-[#E5E5E5] py-16 px-6 bg-[#FAFAFA]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-serif text-xl tracking-widest mb-6">AESTHÈTE</h3>
                        <p className="text-gray-500 max-w-sm">Definiendo el lujo moderno a través del diseño con propósito y la calidad inconcesionable.</p>
                    </div>
                    <div>
                        <h4 className="font-medium tracking-widest uppercase text-xs mb-6">Atención al Cliente</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li><a href="#" className="hover:text-[#111111] transition-colors">Contáctanos</a></li>
                            <li><a href="#" className="hover:text-[#111111] transition-colors">Envíos y Devoluciones</a></li>
                            <li><a href="#" className="hover:text-[#111111] transition-colors">Guía de Cuidados</a></li>
                            <li><a href="#" className="hover:text-[#111111] transition-colors">Preguntas Frecuentes</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium tracking-widest uppercase text-xs mb-6">Mantente Conectado</h4>
                        <p className="text-gray-500 text-xs mb-4">Suscríbete para recibir novedades, acceso a ventas privadas de colección.</p>
                        <div className="flex border-b border-[#111111] pb-2">
                            <input type="email" placeholder="Ingresa tu correo" className="bg-transparent w-full text-sm outline-none placeholder:text-gray-400" />
                            <button><ArrowRight size={16} /></button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
