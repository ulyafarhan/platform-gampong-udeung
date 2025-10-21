<?php

namespace Tests\Feature\Filament;

use App\Filament\Resources\PostResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class PostResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->create());
    }

    public function test_can_render_list_page(): void
    {
        Livewire::test(PostResource\Pages\ListPosts::class)->assertSuccessful();
    }

    public function test_can_create_post(): void
    {
        $newPost = Post::factory()->make();

        Livewire::test(PostResource\Pages\CreatePost::class)
            ->fillForm([
                'title' => $newPost->title,
                'body' => $newPost->body,
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('posts', [
            'title' => $newPost->title,
            'body' => $newPost->body,
        ]);
    }

    public function test_can_edit_post()
    {
        $post = Post::factory()->create();
        $newPostData = Post::factory()->make();

        Livewire::test(PostResource\Pages\EditPost::class, [
            'record' => $post->getRouteKey(),
        ])
            ->fillForm([
                'title' => $newPostData->title,
                'body' => $newPostData->body,
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => $newPostData->title,
            'body' => $newPostData->body,
        ]);
    }

    public function test_can_delete_post()
    {
        $post = Post::factory()->create();

        Livewire::test(PostResource\Pages\EditPost::class, [
            'record' => $post->getRouteKey(),
        ])
            ->callAction('delete')
            ->assertHasNoErrors();

        $this->assertDatabaseMissing('posts', [
            'id' => $post->id,
        ]);
    }
}