import React, { useState } from 'react';
import { Send, Users, Play, Maximize, Volume2, Settings } from 'lucide-react';
import ReactPlayer from 'react-player';

const Streaming = () => {
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=aqz-KE-bpKQ'); // High compatibility test URL
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([
        { user: 'Admin', text: 'Welcome to the live stream! The movie will start shortly.' },
        { user: 'Fan123', text: 'Cant wait for the show!' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { user: 'You', text: input }]);
            setInput('');
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-dark-bg flex flex-col md:flex-row h-screen overflow-hidden">
            {/* Video Player Area */}
            <div className="flex-grow bg-black flex flex-col relative group overflow-hidden border-b md:border-b-0 border-white/10">
                <div className="flex-grow relative h-full w-full">
                    <ReactPlayer
                        url={url}
                        playing={playing}
                        volume={volume}
                        width="100%"
                        height="100%"
                        controls={false}
                        onReady={() => {
                            console.log("Player Ready");
                            setLoading(false);
                        }}
                        onBuffer={() => setLoading(true)}
                        onBufferEnd={() => setLoading(false)}
                        onStart={() => {
                            console.log("Playback Started");
                            setPlaying(true);
                        }}
                        onError={(e) => {
                            console.error("Player Error:", e);
                            setError(true);
                            setLoading(false);
                        }}
                        style={{ position: 'absolute', top: 0, left: 0 }}
                    />

                    {/* Loading State */}
                    {loading && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-dark-bg/80 backdrop-blur-sm">
                            <div className="w-10 h-10 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="text-white font-mono text-[10px] uppercase tracking-widest">Initializing Player...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black text-center p-6">
                            <h2 className="text-red-500 text-lg font-display mb-2">SOURCE ERROR</h2>
                            <p className="text-gray-400 text-xs mb-6">Could not establish connection to stream server.</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 border border-neon-blue text-neon-blue text-[10px] font-bold uppercase tracking-widest hover:bg-neon-blue hover:text-white transition-all"
                            >
                                Force Reload
                            </button>
                        </div>
                    )}

                    {/* Start Overlay if not playing and no error */}
                    {!playing && !error && !loading && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
                            <div className="text-center">
                                <h2 className="text-white/50 text-2xl font-display mb-2 select-none uppercase tracking-widest">Live Stream</h2>
                                <div
                                    onClick={() => setPlaying(true)}
                                    className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto hover:border-neon-blue hover:bg-neon-blue/10 transition-all cursor-pointer group/play"
                                >
                                    <Play className="text-white group-hover/play:text-neon-blue ml-1" fill="currentColor" size={32} />
                                </div>
                                <p className="text-gray-500 mt-4 font-mono text-xs">Click to start playback</p>
                            </div>
                        </div>
                    )}

                    {/* Custom Overlay Controls */}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setPlaying(!playing)} className="text-white hover:text-neon-blue">
                                {playing ? <div className="w-4 h-4 bg-white" /> : <Play size={20} fill="currentColor" />}
                            </button>
                            <div className="text-white font-bold flex items-center gap-2 text-sm tracking-tighter">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                LIVE
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-white text-sm font-bold">
                            <div className="flex items-center gap-2 group/vol">
                                <Volume2 size={18} className="text-gray-400 group-hover/vol:text-white" />
                                <input
                                    type="range"
                                    min="0" max="1" step="0.1"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="w-20 accent-neon-blue"
                                />
                            </div>
                            <button className="hover:text-neon-blue"><Settings size={18} /></button>
                            <button className="hover:text-neon-blue"><Maximize size={18} /></button>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-black/80 border-t border-white/10 p-2 flex items-center justify-between z-30">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${playing ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
                        <span className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">
                            {playing ? 'SIGNAL LIVE - 1080P' : 'SIGNAL IDLE'}
                        </span>
                    </div>
                    <div className="text-[10px] text-neon-blue font-mono cursor-pointer hover:underline" onClick={() => window.location.reload()}>
                        REFRESH PLAYER
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="w-full md:w-80 lg:w-96 bg-dark-surface border-l border-white/10 flex flex-col h-[50vh] md:h-full">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-white font-bold font-display">LIVE CHAT</h3>
                    <div className="flex items-center text-xs text-neon-green gap-1 bg-neon-green/10 px-2 py-1 rounded">
                        <Users size={12} /> 12.5k
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className="text-sm">
                            <span className={`font-bold mr-2 ${msg.user === 'Admin' ? 'text-neon-pink' : 'text-neon-blue'}`}>{msg.user}:</span>
                            <span className="text-gray-300 break-words">{msg.text}</span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-dark-bg/50">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full bg-dark-bg border border-white/10 rounded-full pl-4 pr-10 py-2 text-white text-sm focus:outline-none focus:border-neon-blue"
                            placeholder="Say something..."
                        />
                        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                            <Send size={16} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Streaming;
