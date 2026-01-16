"use client";

import * as React from "react";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Users, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VideoPlayer } from "@/components/viewer/VideoPlayer";
import { ChatSection } from "@/components/viewer/ChatSection";
import { getStreamById, getTokenByAddress, mockTokens } from "@/data/mockStreams";
import { ROUTES } from "@/lib/constants";

export default function StreamViewerPage() {
  const params = useParams();
  const streamId = params.id as string;
  const stream = getStreamById(streamId);

  if (!stream) {
    notFound();
  }

  const token = getTokenByAddress(stream.token.address) || mockTokens[0];

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-16 z-30">
        <div className="container px-4 mx-auto max-w-[1600px]">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-white">
                <Link href={ROUTES.streams}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>
              </Button>
              <div className="hidden sm:flex items-center gap-2">
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-mono">
                  ${token.symbol}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-white" onClick={copyShareLink}>
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-6 mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Main Content */}
          <div className="space-y-4">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl overflow-hidden bg-black aspect-video"
            >
              <VideoPlayer stream={stream} />
            </motion.div>

            {/* Stream Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {/* Title & Stats */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-xl font-semibold leading-tight">{stream.title}</h1>
                  {stream.isLive && (
                    <Badge className="bg-red-500 text-white border-0 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-1.5" />
                      LIVE
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {stream.viewerCount.toLocaleString()} watching
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Started 2h ago
                  </span>
                </div>
              </div>

              {/* Creator */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={stream.creator.avatar} />
                    <AvatarFallback className="bg-green-600 text-white font-bold">
                      {stream.creator.displayName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{stream.creator.displayName || "Anonymous"}</p>
                    <p className="text-xs text-muted-foreground font-mono">{stream.creator.address}</p>
                  </div>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white">
                  Follow
                </Button>
              </div>

              {/* Token Info */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                      {token.symbol[0]}
                    </div>
                    <div>
                      <p className="font-medium">{token.name}</p>
                      <p className="text-sm text-green-400 font-mono">${token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium">${token.price?.toFixed(token.price < 1 ? 6 : 2)}</p>
                    <p className={`text-sm ${(token.priceChange24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {(token.priceChange24h || 0) >= 0 ? '+' : ''}{token.priceChange24h?.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chat Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-32 lg:h-[calc(100vh-9rem)]"
          >
            <div className="h-full rounded-xl overflow-hidden border border-white/10 bg-white/5 flex flex-col">
              <ChatSection
                streamId={stream.id}
                isLive={stream.isLive}
                viewerCount={stream.viewerCount}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}