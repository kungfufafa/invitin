<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ThemeVersion extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'theme_id',
        'version',
        'schema_json',
        'renderer_key',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'schema_json' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function theme(): BelongsTo
    {
        return $this->belongsTo(Theme::class);
    }
}
