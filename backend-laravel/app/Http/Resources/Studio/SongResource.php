<?php

namespace App\Http\Resources\Studio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SongResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'artist' => array_map('trim', explode(',', $this->artist)),
            'slug' => $this->slug,
            'status' => $this->status,
            'genres' => $this->when(
                $this->relationLoaded('genres'),
                $this->genres->select('id', 'name')
            ),
            'cover' => $this->cover,
            'youtube_url' => $this->youtube_url,
            'released_year' => $this->released_year,
            'publisher' => $this->publisher,
            'bpm' => $this->bpm,
            'sections' => $this->when(
                $this->relationLoaded('sections'),
                SectionResource::collection($this->sections)
            ),
            'keys' => $this->when(
                $this->relationLoaded('keys'),
                $this->keys->select('id', 'key', 'family_name', 'family')
            ),
            'engagement_metrics' => [
                'view_count' => $this->views,
                'like_count' => 5647384,
                'dislike_count' => 1,
                'comment_count' => 897656,

            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
