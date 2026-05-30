<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ data_get($data, 'basic.title', $invitation->title) }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body class="bg-[#F8F7F4] text-neutral-800">
    
    <!-- Hero Section -->
    <header class="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div class="absolute inset-0 bg-neutral-900/10 z-0"></div>
        <div class="z-10 max-w-3xl mx-auto space-y-6">
            <p class="uppercase tracking-[0.3em] text-sm font-medium opacity-80">The Wedding Of</p>
            
            <h1 class="font-serif text-5xl md:text-7xl italic">
                {{ data_get($data, 'couple.0.nickname', 'Groom') }} & 
                {{ data_get($data, 'couple.1.nickname', 'Bride') }}
            </h1>
            
            @if(data_get($data, 'basic.main_date'))
                <p class="text-lg md:text-xl font-light mt-8 tracking-widest border-t border-b border-black/20 py-2 inline-block">
                    {{ \Carbon\Carbon::parse(data_get($data, 'basic.main_date'))->translatedFormat('l, d F Y') }}
                </p>
            @endif
        </div>
    </header>

    <!-- Couple Details Section -->
    <section class="py-24 px-4 bg-white">
        <div class="max-w-4xl mx-auto text-center space-y-16">
            <h2 class="font-serif text-3xl italic">Mempelai Berbahagia</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
                <!-- Groom -->
                <div class="space-y-4">
                    <div class="w-32 h-32 mx-auto rounded-full bg-neutral-200 border-4 border-[#E2E6D9]"></div>
                    <h3 class="font-serif text-2xl">{{ data_get($data, 'couple.0.full_name', 'Nama Mempelai Pria') }}</h3>
                </div>
                
                <!-- Bride -->
                <div class="space-y-4">
                    <div class="w-32 h-32 mx-auto rounded-full bg-neutral-200 border-4 border-[#E2E6D9]"></div>
                    <h3 class="font-serif text-2xl">{{ data_get($data, 'couple.1.full_name', 'Nama Mempelai Wanita') }}</h3>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 text-center bg-[#E2E6D9] text-neutral-800">
        <p class="font-serif text-2xl italic mb-2">
            {{ data_get($data, 'couple.0.nickname', 'Groom') }} & 
            {{ data_get($data, 'couple.1.nickname', 'Bride') }}
        </p>
        <p class="text-sm opacity-60">Created with Invitin by Mekaya</p>
    </footer>

</body>
</html>
