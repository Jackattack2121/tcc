"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface OurMenusProps {
  onClose: () => void
}

interface MenuItem {
  title: string
  image: string
  content: React.ReactNode
}

const menuItems: MenuItem[] = [
  {
    title: "Grazing & Canapés",
    image:
      "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/dc18d3_b96349a89e57412faac961aa86c4213a~mv2-q6abQkdNxf6u9dUPbfKmYLLBOYi4kO.jpg",
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">Gourmet Catering Services</h3>
        <p className="mb-6">
          Below are some options of our beautiful grazing style canapé options, curated from South Australian
          ingredients. Perfect for corporate food events and special occasions.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Cold Canapés</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Whipped chèvre tartlet, wakame, wasabi leaf</li>
              <li>Fresh-shucked oyster, rhubarb, raspberry vinaigrette</li>
              <li>Smoked trout, crostini, cherry tomato dust</li>
              <li>Seared A5 wagyu, salt and vinegar chip, sesame</li>
              <li>Cucumber cup, fire-roasted eggplant, chickpea and shatta</li>
              <li>Kingfish ceviche, grapefruit, tostada</li>
              <li>Beetroot gravlax, KI gin, labneh, puffed quinoa</li>
              <li>Marinated watermelon, sweet fish sauce, kaffir lime</li>
              <li>White anchovy, smoked potato hash, crème fraiche</li>
              <li>Rock melon, San Danielle prosciutto, fermented chilli</li>
              <li>Oyster & Caviar Tartlet, Champagne mignonette, crème fraîche, Ossetra caviar</li>
              <li>Foie Gras & Fig Brioche, Torched foie gras, fig jam, truffle honey glaze</li>
              <li>Miso-Marinated Tuna Crudo, Yuzu gel, crispy nori, micro shiso</li>
              <li>Smoked Venison Carpaccio, Beetroot purée, horseradish cream, pickled mustard seeds</li>
              <li>Chilled Lobster Medallions, Saffron aioli, seaweed crisps, edible flowers</li>
              <li>Spherified Gazpacho Pearls, Basil oil, compressed cucumber, balsamic pearls</li>
              <li>Salmon Tartare on Buckwheat Blini, Caviar, chive crème, lemon zest</li>
              <li>Charcoal-Grilled Octopus, Black garlic emulsion, saffron potato, smoked paprika dust</li>
              <li>Compressed Watermelon & Feta, Aged balsamic, candied walnuts, mint chiffonade</li>
              <li>Wagyu Beef Tataki, Ponzu gel, fried leek, gold leaf garnish</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Hot Canapés</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Free-range chicken skewer, Penang satay, kaffir lime</li>
              <li>Prawn brioche, kewpie and chilli, chives</li>
              <li>Charcoal chicken wing, nouc cham, peanut and betel leaf</li>
              <li>Grilled Tiger Prawn, red chilli Nam Jim</li>
              <li>Duck parfait, cherry, sourdough finger</li>
              <li>Coconut prawn skewer, finger lime, chilli</li>
              <li>Seared scallops, salumi xo</li>
              <li>Grilled shiitake, mushroom XO, wasabi leaf</li>
              <li>Smoky Bay oyster, citrus, crispy saltbush</li>
              <li>Truffled Wild Mushroom Vol-au-Vent, Parmesan espuma, chervil</li>
              <li>Butter-Poached Lobster & Corn Velouté, Mini tuille bowl, chive crème fraîche</li>
              <li>Seared Scallops & Black Truffle, Celeriac purée, pickled shallots</li>
              <li>Caramelized Onion & Gruyère Tartlet, Smoked salt, fresh thyme</li>
              <li>Duck Confit & Orange Reduction, Crispy polenta, micro greens</li>
              <li>Mini Beef Wellington, Rare filet, mushroom duxelles, truffle demi-glace</li>
              <li>Saffron Risotto Croquette, Aged parmesan, edible gold flakes</li>
              <li>Crispy Langoustine with Lemon Verbena Butter, Pea purée, fennel pollen</li>
              <li>Roasted Quail with Date Glaze, Celeriac slaw, crispy shallots</li>
              <li>Braised Short Rib Tartlet, Red wine reduction, micro cress</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Dessert Canapés</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Mini Grand Marnier Soufflé, Crisp tuile, candied orange zest</li>
              <li>Lavender & Honey Panna Cotta, Passion fruit gel, almond crumble</li>
              <li>Petit Chocolate Sphere, Gold leaf, hazelnut praline, raspberry dust</li>
              <li>Earl Grey Infused Macarons, Bergamot crème, edible flowers</li>
              <li>Caramelized Pear & Vanilla Mascarpone Tart, Almond sable base</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Chef's Table Experience",
    image:
      "https://afcks0sjupys5isr.public.blob.vercel-storage.com/TCC/chefstablemenu-e2gcsgVbYI953Fypu0VugWRJhATlYa.png",
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">Intimate Dining Experience</h3>
        <p className="mb-4">
          My favourite way for our guests to dine! The ultimate private chef experience in Adelaide.
        </p>
        <p className="mb-6">
          Please contact us if you would like to discuss wine pairings throughout the evening for your luxury dining
          experience.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Entrée</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Sa scallop, miso hollandaise, nori, chicken skin</li>
              <li>Woodfired bread, smoked butter, local salumi</li>
              <li>Szechuan lamb ribs, plum and pickled onion, lamb jus</li>
              <li>Chargrilled SA squid, handmade cacciatore, whipped white bean</li>
              <li>Butterflied SG prawn, nduja butter, nori and bonito, miso</li>
              <li>Cured kingfish, citrus, yuzu kosho, green mango, curry leaf</li>
              <li>Robe crayfish, beurre Blanc, finger lime, and native herb</li>
              <li>Blue swimmer crab on betel leaf, fermented chilli, lime</li>
              <li>Wagyu tartar, shichimi togarashi, smoked soy, edamame, nori</li>
              <li>La stella burrata, peaches, San Danielle prosciutto, sourdough</li>
              <li>Ricotta-stuffed tempura zucchini flowers, mushroom XO</li>
              <li>Roasted sunchokes, truffle and parsnip velouté, sunchoke chip</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-3">Main</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Chargrilled free-range quail, master stock jus, roasted plum</li>
              <li>Wagyu over the coals, salumi xo, mushroom medley, jus</li>
              <li>Pressed beef rib, bone marrow jus, pickled baby beets, herbs</li>
              <li>Market fish pan-seared, miso-glazed, green pea, and wasabi</li>
              <li>Lamb shoulder, Sicilian olive, fired eggplant caponata</li>
              <li>Crispy barramundi, Jerusalem artichoke, master stock, cucumber</li>
              <li>Murray Cod over the coals, pommes puree, Nduja, curry leaf</li>
              <li>Nomad chicken, fire-roasted miso pumpkin, curry leaf, and jus</li>
              <li>Roasted sugar loaf cabbage, whipped edamame, mushroom X0</li>
              <li>Massaman pumpkin, toasted coconut, green mango, and chilli</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white mb-3">To Finish</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Coconut brulee, in season berries, coconut prailine, kaffir lime</li>
              <li>Basque cheesecake, miso caramel, burnt citrus, popcorn</li>
              <li>Amaretto sponge, rum gelato, torched peaches in syrup</li>
              <li>Sunchoke and vanilla bean semi freddo, toffee, candied apple</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
]

export const OurMenus: React.FC<OurMenusProps> = ({ onClose }) => {
  const [currentMenu, setCurrentMenu] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const goToMenu = (index: number) => {
    setDirection(index > currentMenu ? 1 : -1)
    setCurrentMenu(index)
    setIsDropdownOpen(false)
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100] overflow-y-auto"
    >
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-black rounded-lg shadow-2xl w-full max-w-5xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Standardized header */}
        <div className="bg-black py-12 flex items-center justify-center border-b border-gray-700">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            Our Menus
          </motion.h2>
        </div>

        <div className="sticky top-0 left-0 right-0 z-10 bg-black border-b border-gray-700">
          <div className="hidden md:flex justify-center space-x-8 p-6">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => goToMenu(index)}
                className={`text-lg font-medium transition-all duration-300 ${
                  currentMenu === index ? "text-white border-b-2 border-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="md:hidden relative p-4">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full p-2 text-white bg-gray-800 rounded-md"
            >
              <span>{menuItems[currentMenu].title}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-gray-800 rounded-b-md shadow-lg z-20">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => goToMenu(index)}
                    className="block w-full text-left p-4 text-white hover:bg-gray-700"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <Image
              src={menuItems[currentMenu].image || "/placeholder.svg"}
              alt={menuItems[currentMenu].title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
          </div>
          <div ref={contentRef} className="w-full md:w-1/2 overflow-y-auto p-6 bg-black max-h-[50vh] md:max-h-[60vh]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentMenu}
                custom={direction}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? "100%" : "-100%",
                    opacity: 0,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                  },
                  exit: (direction: number) => ({
                    x: direction < 0 ? "100%" : "-100%",
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="h-full overflow-y-auto"
              >
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {menuItems[currentMenu].title}
                </motion.h2>
                <motion.div
                  className="text-lg text-white leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {menuItems[currentMenu].content}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20"
          aria-label="Close Our Menus"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  )
}
