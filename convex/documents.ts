
import { paginationOptsValidator } from "convex/server";
import { query ,mutation} from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");
    

    // ← THIS IS KEY
    const organizationId=(user.organization_id ?? undefined) as 
      | string
      | undefined

    const documentId = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      organizationId, // ← Save the org ID (or null for personal)
      initialContent: args.initialContent,
    });

    return documentId;
  },
});
export const get = query({
  args: {
    search: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx,{search,paginationOpts}) => {
    const user=await ctx.auth.getUserIdentity()
    if(!user){
      throw new ConvexError("Unauthorized")
    }
    const organizationId=(user.organization_id ?? undefined) as 
      | string
      | undefined

      //within org
    if(search && organizationId){
      return await ctx.db.query("documents")
      .withSearchIndex("search_title", (q)=>
        q.search("title",search).eq("organizationId",organizationId))
        .paginate(paginationOpts)
    }
      //personal
    if(search){
      return await ctx.db
      .query("documents")
      .withSearchIndex("search_title",(q)=>q.search("title",search).eq("ownerId",user.subject)).paginate(paginationOpts)
    }
    //org
    if(organizationId){
      return await ctx.db.query("documents")
      .withIndex("by_organization_id", (q)=>
        q.eq("organizationId",organizationId))
        .paginate(paginationOpts)
    }
    const documents = await ctx.db.query("documents").withIndex("by_owner_id",(q)=>q.eq("ownerId",user.subject)).paginate(paginationOpts);
    return documents; // ✅ return the list so frontend can use it
  },
});

export const removeById=mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    console.log("[DEBUG] removeById called with id:", args.id);

    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      console.log("[DEBUG] Unauthorized - no user identity");
      throw new ConvexError("Unauthorized");
    }
    console.log("[DEBUG] User authenticated:", user.subject);
    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;
    const document=await ctx.db.get(args.id)
    if(!document){
      throw new ConvexError("Document not found")
    }
    const isOwner=document?.ownerId===user.subject
    const isOrganizationMember =
      !!(organizationId && document.organizationId && document.organizationId === organizationId);
    if(!isOwner && !isOrganizationMember){
      throw new ConvexError("Unauthorized")
    }

    return await ctx.db.delete(args.id)
  }
})

export const updateNyId = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const document = await ctx.db.get(args.id);
    if (!document) throw new ConvexError("Document not found");

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember =
      !!(organizationId && document.organizationId && document.organizationId === organizationId);

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.patch(args.id, { title: args.title });
  },
});


// convex/documents.ts
export const getById = query({
  args: { id: v.id("documents") },
  handler: async (ctx, { id }) => {
    const document = await ctx.db.get(id);
    if (!document) {
      throw new ConvexError("Document not found");
    }
    return document;
  },
})