"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * A threaded discussion with one level of nesting and no more.
 *
 * One level is a deliberate limit. Arbitrarily deep threads either indent until the text column is
 * unreadable on a phone, or need a collapse mechanism that is a feature in itself. Capping at one
 * reply level covers the overwhelming majority of real threads and keeps the layout honest at every
 * width.
 *
 * Timestamps are `<time datetime>` with a machine-readable value and a human-readable body. "2h ago"
 * alone is unparseable by anything automated and ambiguous once the page has been open a while.
 *
 * Indentation uses `ms-*` and a `border-s`, so the thread nests toward the inline start and mirrors
 * correctly under RTL. `ml-*` with a `border-l` — the obvious way to write this — would indent
 * replies off the wrong edge in Arabic or Hebrew.
 */
export function CommentThread() {
  const thread = [
    {
      author: "Ana Whitfield",
      initials: "AW",
      role: "Owner",
      when: "2026-07-28T09:14:00Z",
      whenLabel: "2 hours ago",
      body: "Refunds are up 40% week over week, concentrated in the EU store. Anyone changed the shipping rules?",
      replies: [
        {
          author: "Marcus Oyelaran",
          initials: "MO",
          when: "2026-07-28T09:41:00Z",
          whenLabel: "94 minutes ago",
          body: "The VAT threshold changed on the 25th. I think we are quoting duty at checkout that customers are then charged again on delivery.",
        },
        {
          author: "Priya Raman",
          initials: "PR",
          when: "2026-07-28T10:02:00Z",
          whenLabel: "73 minutes ago",
          body: "That matches the support tickets — all of them mention an unexpected charge on arrival.",
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {thread.map((comment) => (
        <div key={comment.author} className="space-y-3">
          <article className="flex gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="text-[11px]">{comment.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">{comment.author}</p>
                <Badge variant="secondary" className="text-[10px]">
                  {comment.role}
                </Badge>
                <time dateTime={comment.when} className="text-xs text-muted-foreground">
                  {comment.whenLabel}
                </time>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{comment.body}</p>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                Reply
              </Button>
            </div>
          </article>

          {/* One nesting level, indented toward the inline start so it mirrors under RTL. */}
          <div className="space-y-3 border-s ms-11 ps-4">
            {comment.replies.map((reply) => (
              <article key={reply.author} className="flex gap-3">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="text-[10px]">{reply.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{reply.author}</p>
                    <time dateTime={reply.when} className="text-xs text-muted-foreground">
                      {reply.whenLabel}
                    </time>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{reply.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
