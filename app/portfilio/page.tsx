'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/app/components/NavBar';
import NoContextMenuPage from '@/app/components/DisableContextMenu';
import Footer from '@/app/components/Footer';
import { supabase } from '@/app/admin/supabaseClient';

// 1) Story interface: unify "tags" as string[] so everything is consistent
type Story = {
  id: number;
  couple: string;
  date: string;
  thumbnail: string;
  description: string;
  pixiesetLink: string;
  tags: string[]; // We'll parse from both static array and DB
};

// 2) Static Stories
// (Unchanged from your code, except corrected any typos)
const staticStories: Story[] = [
  {
    id: 5,
    couple: 'Saba & Vaji',
    date: 'October 20th, 2024',
    thumbnail: 'story-5/sab01.jpg',
    description: 'A captivating moment captured in time.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/sabaandvaji/',
    tags: ['Pre-Wedding', 'Persian'],
  },
  {
    id: 2,
    couple: 'Malek & Shelair',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/DSC_3448.JPG',
    description: 'An unforgettable scene full of emotion.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/malekandshelair/',
    tags: ['Wedding', 'Arab'],
  },
  {
    id: 6,
    couple: 'Simran & Ramandeep',
    date: 'September 2024',
    thumbnail: 'reviews/Simran.jpg',
    description: 'An unforgettable scene full of emotion.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/web-1/',
    tags: ['Wedding', 'South Asian'],
  },
  {
    id: 1,
    couple: 'Hanieh & Shayan',
    date: 'September 2024',
    thumbnail: '/pictures-gallery/Han11.png',
    description: 'An unforgettable scene full of emotion.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/haniehandshayan/',
    tags: ['Pre-Wedding', 'Persian'],
  },
  {
    id: 3,
    couple: 'Lida & Tam',
    date: 'August 2024',
    thumbnail: '/pictures-gallery/L01.jpg',
    description: 'An unforgettable scene full of emotion.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/lidaandtam/',
    tags: ['Wedding', 'Asian'],
  },
  {
    id: 7,
    couple: 'Hersehell & Roberto',
    date: 'October 2024',
    thumbnail: 'story-2/Her07.jpg',
    description: 'An unforgettable scene full of emotion.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/hersehellandroberto/',
    tags: ['Wedding', 'Asian'],
  },
  {
    id: 8,
    couple: 'Hania & Hadi',
    date: 'December, 2024',
    thumbnail: 'story-7/DSC_3486.JPG',
    description: 'A captivating moment captured in time.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/haniaandhadi-1/',
    tags: ['engagement'],
  },
];

export default function PortfolioPage() {
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);

  // UI states for searching, filtering, load more
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [visibleStories, setVisibleStories] = useState(6);

  // 3) On mount, fetch DB stories and parse their `tags` from text -> string[]
  useEffect(() => {
    const fetchDBStories = async () => {
      try {
        setLoading(true);
        // If your table is named 'stories':
        const { data, error } = await supabase.from('stories').select('*');
        if (error) {
          console.error('Error fetching DB stories:', error);
          // fallback to just static if DB fails
          setAllStories(staticStories);
          return;
        }

        if (data) {
          // Parse tags from "Wedding, Persian" -> ["Wedding", "Persian"]
          const parsedDBStories: Story[] = data.map((row: any) => {
            const tagArray = row.tags
              ? row.tags
                  .split(',')
                  .map((tag: string) => tag.trim())
                  .filter(Boolean)
              : [];
            return {
              id: row.id,
              couple: row.couple,
              date: row.date,
              thumbnail: row.thumbnail,
              description: row.description,
              pixiesetLink: row.pixiesetLink,
              tags: tagArray,
            };
          });

          // Merge static + DB stories
          // (If you want DB stories first, do [...parsedDBStories, ...staticStories])
          const merged = [...staticStories, ...parsedDBStories];
          setAllStories(merged);
        }
      } catch (err) {
        console.error('Supabase fetch error:', err);
        // fallback to static
        setAllStories(staticStories);
      } finally {
        setLoading(false);
      }
    };

    fetchDBStories();
  }, []);

  // 4) Build unique tags from allStories (including static + DB)
  const uniqueTags = ['All', ...new Set(allStories.flatMap((s) => s.tags))];

  // 5) Filter logic
  const filteredStories = allStories.filter((story) => {
    const matchesSearch =
      story.couple.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === 'All' || story.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // 6) Show limited stories by "Load More"
  const visibleFilteredStories = filteredStories.slice(0, visibleStories);

  // 7) Load More
  const handleLoadMore = () => setVisibleStories((prev) => prev + 6);

  return (
    <>
      <NoContextMenuPage />
      <Head>
        <title>Portfolio | Fatima Photography</title>
        <meta
          name="description"
          content="Browse captivating stories and portfolio by Fatima Photography."
        />
        <meta name="keywords" content="photography, portfolio, gallery, love, stories" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <header className="h-64 bg-green-950 flex items-center justify-center">
        <h1 className="text-5xl mt-24 text-white drop-shadow-xl">PORTFOLIO</h1>
      </header>

      <div className="flex flex-col min-h-screen">
        {/* Search and Filter Section */}
        <section className="container mx-auto my-10 px-4">
          <div className="flex flex-col items-center space-y-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search stories by name or description..."
              className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg shadow-md
                         focus:outline-none focus:ring-2 focus:ring-green-950 transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Tag Filters */}
            <div className="flex flex-wrap justify-center space-x-2">
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  className={`px-4 py-2 text-sm font-semibold rounded-full ${
                    selectedTag === tag
                      ? 'bg-green-950 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700'
                  } hover:bg-green-700 hover:text-white transition-colors duration-200`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Stories Grid */}
        <main className="container mx-auto my-1 px-4 flex-grow">
          {loading ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold text-gray-600">Loading stories...</h2>
            </div>
          ) : visibleFilteredStories.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold text-gray-600">No stories found!</h2>
              <p className="text-gray-500">Try a different search or filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleFilteredStories.map((story) => (
                <a
                  key={story.id}
                  href={story.pixiesetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group rounded-lg overflow-hidden shadow-lg
                             hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <div className="relative w-full h-[500px] rounded-t-lg">
                    <img
                      src={story.thumbnail}
                      alt={story.couple}
                      className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="bg-white p-6 rounded-b-lg">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-green-950 transition">
                      {story.couple}
                    </h2>
                    <p className="text-sm text-gray-600">{story.date}</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleStories < filteredStories.length && !loading && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-green-950 text-white rounded-lg font-bold
                           hover:bg-green-700 transition duration-200"
              >
                Load More Stories
              </button>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
