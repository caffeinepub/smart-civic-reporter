import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, IssueStatus } from "../backend";
import type { Issue } from "../backend";
import { useActor } from "./useActor";

export type { Issue };
export { IssueStatus };

export function useGetIssues() {
  const { actor, isFetching } = useActor();
  return useQuery<Issue[]>({
    queryKey: ["issues"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getIssues();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitIssue() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      location: string;
      issueType: string;
      description: string;
      photo: File | null;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      let photoBlob: ExternalBlob | null = null;
      if (data.photo) {
        const buf = await data.photo.arrayBuffer();
        photoBlob = ExternalBlob.fromBytes(new Uint8Array(buf));
      }
      return actor.submitIssue(
        data.name,
        data.location,
        data.issueType,
        data.description,
        photoBlob,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
}

export function useUpdateIssueStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { issueId: bigint; status: string }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.updateIssueStatus(data.issueId, data.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
}

export function useAdminLogin() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (password: string) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.adminLogin(password);
    },
  });
}
