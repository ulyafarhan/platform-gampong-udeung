<?php

namespace Tests\Feature\Filament;

use App\Filament\Resources\PostResource\Pages\CreatePost;
use App\Filament\Resources\PostResource\Pages\EditPost;
use App\Filament\Resources\PostResource\Pages\ListPosts;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class PostResourceTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        // Buat user baru untuk setiap test
        $this->user = User::factory()->create();

        $this->user->givePermissionTo('view-any Post');
        $this->user->givePermissionTo('create Post');
        $this->user->givePermissionTo('update Post');
        $this->user->givePermissionTo('delete Post');

        $this->actingAs($this->user);
    }

    public function test_halaman_daftar_berita_bisa_ditampilkan(): void
    {
        $this->get(ListPosts::getUrl())->assertSuccessful();
    }

    public function test_bisa_membuat_berita_baru(): void
    {
        $newData = Post::factory()->make();

        Livewire::test(CreatePost::class)
            ->fillForm([
                'title' => $newData->title,
                'body' => $newData->body,
                'user_id' => $this->user->id, // Gunakan user yang sedang login
                'published_at' => $newData->published_at,
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas(Post::class, [
            'title' => $newData->title,
        ]);
    }

    public function test_bisa_memvalidasi_input_saat_membuat_berita(): void
    {
        Livewire::test(CreatePost::class)
            ->fillForm(['title' => null])
            ->call('create')
            ->assertHasFormErrors(['title' => 'required']);
    }

    public function test_bisa_menampilkan_data_berita_di_halaman_edit(): void
    {
        $post = Post::factory()->create();

        $this->get(EditPost::getUrl(['record' => $post]))->assertSuccessful();
    }

    public function test_bisa_mengubah_data_berita(): void
    {
        $post = Post::factory()->create();
        $newData = Post::factory()->make();

        Livewire::test(EditPost::class, ['record' => $post->getRouteKey()])
            ->fillForm([
                'title' => $newData->title,
                'body' => $newData->body,
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas(Post::class, [
            'id' => $post->id,
            'title' => $newData->title,
        ]);
    }

    public function test_bisa_menghapus_berita(): void
    {
        $post = Post::factory()->create();

        Livewire::test(EditPost::class, ['record' => $post->getRouteKey()])
            ->callAction(\Filament\Actions\DeleteAction::class);

        $this->assertModelMissing($post);
    }
}