
import { paginationOptsValidator } from "convex/server";
import { query ,mutation} from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const create=mutation({
  args:{title:v.optional(v.string()),initialContent:v.optional(v.string())},
  handler:async(ctx,args)=>{
    const user=await ctx.auth.getUserIdentity();
    if(!user){
      throw new ConvexError("Unauthorized")
    }

    const documentId=await ctx.db.insert("documents",{
      title:args.title ?? "Untitled Document",
      ownerId:user.subject,
      initialContent:args.initialContent,
    })
  }
})
export const get = query({
  args:{paginationOpts:paginationOptsValidator},
  handler: async (ctx,args) => {
    const documents = await ctx.db.query("documents").paginate(args.paginationOpts);
    return documents; // ✅ return the list so frontend can use it
  },
});
