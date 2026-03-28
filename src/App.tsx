import { useState, ReactNode, DragEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, 
  Zap, 
  CheckCircle, 
  Building2, 
  FileText, 
  Settings, 
  Users, 
  Bell,
  Plus,
  FileUp,
  Database,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CloudUpload,
  ShieldCheck,
  Landmark,
  Map,
  StickyNote,
  Image as ImageIcon,
  Clock,
  Loader2,
  X,
  RotateCcw,
  AlertCircle
} from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'intake'>('dashboard');
  const [isUploaded, setIsUploaded] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [listings, setListings] = useState([
    { id: 1, address: "New Property Address", status: "Waiting", city: "Austin, TX", price: "$0" }
  ]);

  const addListing = () => {
    const newId = listings.length + 1;
    setListings([
      ...listings,
      { id: newId, address: `Property ${newId}`, status: "Pending", city: "TBD", price: "$0" }
    ]);
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle the files here
      setIsUploaded(true);
      setListings(prev => prev.map((l, i) => i === 0 ? { ...l, status: "Ready" } : l));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // Handle the files here
      setIsUploaded(true);
      setListings(prev => prev.map((l, i) => i === 0 ? { ...l, status: "Ready" } : l));
    }
  };

  const onButtonClick = () => {
    const input = document.getElementById("file-upload") as HTMLInputElement;
    if (input) input.click();
  };

  const finalizeListing = () => {
    setListings(prev => {
      const currentIndex = prev.findIndex(l => l.status === "Ready");
      if (currentIndex === -1) return prev;

      const newListings = [...prev];
      newListings[currentIndex] = { ...newListings[currentIndex], status: "Completed" };
      
      // If there's a next listing that is 'Pending', make it 'Waiting' (Active)
      if (currentIndex + 1 < newListings.length && newListings[currentIndex + 1].status === "Pending") {
        newListings[currentIndex + 1] = { ...newListings[currentIndex + 1], status: "Waiting" };
      }
      
      return newListings;
    });
    setIsUploaded(false);
  };

  if (currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#FDFCFB] text-zinc-900 font-sans antialiased flex flex-col">
        <header className="h-20 flex items-center justify-between px-8 border-b border-zinc-100 bg-white shrink-0 z-30">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white">
              <Database className="w-5 h-5" />
            </div>
            <h1 className="font-serif text-2xl tracking-tight text-[#3A3A2E]">EstateFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center text-olive font-bold text-xs border border-olive/20">
              UB
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-12 py-16">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">AI-Powered Extraction</span>
              </div>
              <h2 className="text-6xl font-serif leading-[1.1] tracking-tight text-[#3A3A2E]">
                Transform your <br />
                <span className="italic text-zinc-400">real estate</span> data.
              </h2>
              <p className="text-lg text-zinc-500 max-w-md leading-relaxed">
                Upload listing agreements, seller disclosures, or property photos. Our AI extracts every detail with 99.8% accuracy.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-100 overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-zinc-400 font-medium">
                  Trusted by <span className="text-zinc-900 font-bold">500+</span> top-tier agents
                </p>
              </div>
            </div>

            <div 
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={(e) => {
                handleDrop(e);
                setCurrentPage('intake');
              }}
              className={`relative group cursor-pointer transition-all duration-500 ${dragActive ? 'scale-[1.02]' : ''}`}
            >
              <div className={`absolute -inset-4 bg-gradient-to-tr from-olive/5 via-transparent to-brand-blue/5 rounded-[40px] blur-2xl transition-opacity duration-500 ${dragActive ? 'opacity-100' : 'opacity-0'}`} />
              <div className={`relative aspect-[4/3] bg-white rounded-[32px] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-12 text-center ${dragActive ? 'border-olive bg-olive/[0.02] shadow-2xl shadow-olive/10' : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50'}`}>
                <div className="w-20 h-20 rounded-3xl bg-zinc-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <CloudUpload className="w-10 h-10 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </div>
                <h3 className="text-xl font-serif italic mb-2">Drop documents here</h3>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.2em] mb-8">PDF, JPEG, or PNG up to 50MB</p>
                
                <label className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all cursor-pointer shadow-xl shadow-zinc-200">
                  Select Files
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple 
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setIsUploaded(true);
                        setCurrentPage('intake');
                      }
                    }} 
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Bottom Detail Cards */}
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-4xl font-serif italic text-zinc-300 group-hover:text-zinc-800 transition-colors">04</span>
              </div>
              <h4 className="font-bold text-zinc-800 mb-2">Active Extractions</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">Properties currently being processed by our AI engine.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <span className="text-4xl font-serif italic text-zinc-300 group-hover:text-zinc-800 transition-colors">12</span>
              </div>
              <h4 className="font-bold text-zinc-800 mb-2">Ready for Review</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">Completed extractions waiting for your final verification.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-4xl font-serif italic text-zinc-300 group-hover:text-zinc-800 transition-colors">48</span>
              </div>
              <h4 className="font-bold text-zinc-800 mb-2">Total Properties</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">Your complete history of processed real estate assets.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-zinc-900 font-sans antialiased flex flex-col">
      {/* Top Header */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-zinc-100 bg-white shrink-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-50 rounded-lg transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-900">Dashboard</span>
          </button>
          <div className="text-zinc-200 font-light text-xl">/</div>
          <h1 className="font-serif text-2xl tracking-tight text-[#3A3A2E]">Document Intake</h1>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              Last Saved Mar 25, 2026 • 10:24 AM CT
            </span>
            <button 
              onClick={() => {
                setIsUploaded(false);
                setListings([{ id: 1, address: "New Property Address", status: "Waiting", city: "Austin, TX", price: "$0" }]);
              }}
              className="hover:text-zinc-900 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-3 h-3" />
              Clear All Data
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Listing Queue */}
        <aside className="w-80 border-r border-zinc-100 bg-[#F9F8F6] flex flex-col shrink-0 z-20">
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Listing Queue</span>
            <span className="text-[10px] font-bold text-olive uppercase tracking-wider">0 of {listings.length} Ready</span>
          </div>
          
          <div className="flex-1 p-4 pb-20 space-y-4 overflow-y-auto no-scrollbar">
            <button 
              onClick={addListing}
              className="w-full py-4 border-2 border-dashed border-zinc-200 rounded-xl text-zinc-400 text-[11px] font-bold uppercase tracking-widest hover:border-zinc-300 hover:text-zinc-500 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-3 h-3" />
              Add Another Listing
            </button>

            {listings.map((listing, index) => {
              const isActive = (index === 0 && listing.status !== 'Completed') || 
                              (index > 0 && listings[index-1].status === 'Completed' && listing.status !== 'Completed');
              
              return (
                <div key={listing.id} className={`bg-white p-5 rounded-xl border-2 shadow-sm relative group cursor-pointer transition-all hover:shadow-md ${isActive ? 'border-olive/20' : 'border-zinc-100'}`}>
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-olive rounded-l-xl" />}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      {isActive && <span className="text-[8px] font-black text-olive uppercase tracking-[0.2em] mb-1">Active Intake</span>}
                      <h3 className="font-serif italic text-lg leading-tight">{listing.address}</h3>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      listing.status === 'Waiting' ? 'bg-zinc-100 text-zinc-500' : 
                      listing.status === 'Ready' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                      listing.status === 'Completed' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mb-4">{listing.city} — bed / — bath · {listing.price}</p>
                  <div className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                    {listing.status === 'Waiting' ? 'No Documents Uploaded' : 
                     listing.status === 'Ready' ? 'Processing Documents...' : 
                     listing.status === 'Completed' ? 'Intake Finalized' :
                     'Queued for Intake'}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center: Upload Area */}
        <main className={`flex-1 flex flex-col transition-all duration-700 ease-in-out bg-[#FDFCFB] overflow-hidden ${isUploaded ? 'p-8' : 'p-16'}`}>
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            multiple 
            onChange={handleChange}
          />
          <motion.div 
            layout
            onClick={onButtonClick}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`flex-1 bg-white border-2 border-dashed rounded-[40px] flex flex-col items-center justify-center p-12 text-center group transition-all cursor-pointer relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.03)] ${dragActive ? 'border-olive bg-olive/5 scale-[0.99]' : 'border-zinc-200 hover:border-olive/30 hover:bg-olive/5'}`}
          >
            <div className="max-w-3xl w-full pointer-events-none">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-10 mx-auto transition-all duration-700 ${dragActive ? 'bg-olive text-white scale-110' : 'bg-blue-50 text-brand-blue group-hover:scale-110'}`}>
                <CloudUpload className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-zinc-800 tracking-tight">
                {dragActive ? "Drop your files here" : "Click to upload or drag and drop"}
              </h3>
              <p className="text-sm text-zinc-400 mb-16 uppercase tracking-[0.25em] font-semibold">PDF, DOC, DOCX, JPG, PNG UP TO 30MB</p>
              
              <div className="h-px bg-zinc-100 w-full mb-12" />
              
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-10">Recommended Documents</div>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-16 text-left px-4">
                <DocType icon={<FileText className="w-5 h-5 text-blue-500" />} label="Listing Agreements" />
                <DocType icon={<ShieldCheck className="w-5 h-5 text-orange-500" />} label="Seller's Disclosure" />
                <DocType icon={<Landmark className="w-5 h-5 text-emerald-500" />} label="Tax Records" />
                <DocType icon={<Map className="w-5 h-5 text-amber-500" />} label="Floor Plans & Surveys" />
                <DocType icon={<StickyNote className="w-5 h-5 text-purple-500" />} label="Property Information Notes" />
                <DocType icon={<ImageIcon className="w-5 h-5 text-pink-500" />} label="Property Photos" />
              </div>
            </div>
          </motion.div>
        </main>

        {/* Right Sidebar: Extraction Status (Appears on Upload) */}
        <AnimatePresence>
          {isUploaded && (
            <motion.aside 
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="w-[420px] border-l border-zinc-100 bg-white flex flex-col shrink-0 z-20 shadow-[-20px_0_50px_-12px_rgba(0,0,0,0.03)]"
            >
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-[#F9F8F6]/50">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Live Extraction</span>
                <button onClick={() => setIsUploaded(false)} className="text-zinc-300 hover:text-zinc-900 transition-colors p-1 hover:bg-zinc-100 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-6 pb-20 space-y-6 overflow-y-auto no-scrollbar">
                <div className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-2">Active Properties</div>
                
                <PropertyExtractionCard 
                  address="1284 Barton Hills Dr" 
                  city="Austin, TX"
                  status="Extracting Data" 
                  progress={72}
                  active
                />
                
                <PropertyExtractionCard 
                  address="902 Maple Avenue" 
                  city="Dallas, TX"
                  status="Ready for Review" 
                  progress={100}
                />

                <PropertyExtractionCard 
                  address="4402 West 6th St" 
                  city="Austin, TX"
                  status="Processing Photos" 
                  progress={45}
                  active
                />

                <PropertyExtractionCard 
                  address="210 Oak Lane" 
                  city="Houston, TX"
                  status="Error - Retry" 
                  progress={88}
                  error
                />
                
                <div className="pt-6 border-t border-zinc-50">
                  <div className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-4">Extraction Log</div>
                  <div className="font-mono text-[10px] space-y-2.5 text-zinc-400 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
                    <div className="flex gap-2"><span className="text-zinc-300">[10:18:44]</span> <span className="text-blue-400">FETCH</span> Reading listing_agreement_barton.pdf</div>
                    <div className="flex gap-2"><span className="text-zinc-300">[10:18:47]</span> <span className="text-emerald-400">EXTRACT</span> Property Type → Single Family Residential</div>
                    <div className="flex gap-2"><span className="text-zinc-300">[10:18:49]</span> <span className="text-emerald-400">EXTRACT</span> Sq Footage → 2,284 sq ft</div>
                    <div className="flex gap-2 animate-pulse"><span className="text-zinc-300">[10:19:02]</span> <span className="text-amber-400">PROCESS</span> Analyzing seller disclosure clauses...</div>
                    <div className="flex gap-2"><span className="text-zinc-300">[10:19:15]</span> <span className="text-purple-400">MAP</span> Geocoding Austin property coordinates...</div>
                  </div>
                </div>

                <div className="pt-8 mt-auto">
                  <button 
                    onClick={finalizeListing}
                    className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-zinc-200 group"
                  >
                    Finalize & Move to Next
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-[10px] text-zinc-400 mt-4 font-medium uppercase tracking-widest">
                    All data will be synced to the master database
                  </p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

function DocType({ icon, label }: { icon: ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-4 group/item cursor-default">
      <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center group-hover/item:bg-white group-hover/item:shadow-md transition-all duration-300 border border-transparent group-hover/item:border-zinc-100">
        {icon}
      </div>
      <span className="text-sm text-zinc-600 font-semibold group-hover/item:text-zinc-900 transition-colors">{label}</span>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-4xl font-serif italic text-zinc-800">{value}</span>
      </div>
      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
}

function PropertyExtractionCard({ address, city, status, progress, active = false, error = false }: { address: string, city: string, status: string, progress: number, active?: boolean, error?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all duration-500 ${active ? 'border-brand-blue/20 bg-blue-50/10 shadow-sm' : error ? 'border-red-100 bg-red-50/5' : 'border-zinc-100 hover:border-zinc-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${error ? 'bg-red-400' : progress === 100 ? 'bg-emerald-400' : 'bg-brand-blue'}`}>
            <Building2 className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-zinc-800 truncate tracking-tight">{address}</p>
            <p className="text-[10px] text-zinc-400 font-medium mb-1">{city}</p>
            <div className="flex items-center gap-2">
              <p className={`text-[9px] font-bold uppercase tracking-widest ${error ? 'text-red-500' : progress === 100 ? 'text-emerald-500' : 'text-brand-blue'}`}>
                {status}
              </p>
              {active && <Loader2 className="w-2.5 h-2.5 text-brand-blue animate-spin" />}
            </div>
          </div>
        </div>
        {error ? (
          <AlertCircle className="w-4 h-4 text-red-400" />
        ) : progress === 100 ? (
          <CheckCircle className="w-4 h-4 text-emerald-500" />
        ) : (
          <div className="text-[10px] font-bold text-zinc-300">{progress}%</div>
        )}
      </div>
      
      <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className={`h-full rounded-full ${error ? 'bg-red-400' : progress === 100 ? 'bg-emerald-500' : 'bg-brand-blue'}`}
        />
      </div>
    </div>
  );
}
