export async function searchSong(query: string) {
  try {
    const response = await fetch(`/api/search/${query}`);

    if (!response.ok) {
      throw new Error(`Error searching for the song: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    const { results } = jsonResponse;

    if (!Array.isArray(results)) {
      throw new Error("Invalid response format: results is not an array");
    }

    return results;
  } catch (error) {
    console.error("Error searching for the song:", error);
    throw error;
  }
}

export async function downloadSong(videoId: string) {
  await fetch(`/api/download/${videoId}`);
}
