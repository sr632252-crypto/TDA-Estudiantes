# Música de fondo y efectos sintetizados (sin samples externos).
import numpy as np, soundfile as sf
sr = 44100
rng = np.random.default_rng(7)
def env(n, a, r):
    e = np.ones(n); a=int(a*sr); r=int(r*sr)
    e[:a] = np.linspace(0,1,a); e[-r:] *= np.linspace(1,0,r); return e
def lp(x, k):  # filtro paso bajo simple de un polo
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc += k*(x[i]-acc); y[i]=acc
    return y
bpm=100; beat=60/bpm; total=46.0; N=int(total*sr)
mix=np.zeros(N)
# acordes: Am - F - C - G  (2 compases cada uno)
chords=[[57,60,64],[53,57,60],[48,55,64],[55,59,62]]
f=lambda m:440*2**((m-69)/12)
bar=4*beat
t=np.arange(int(2*bar*sr))/sr
pads=[]
for ch in chords:
    s=np.zeros_like(t)
    for m in ch:
        for det in (-0.08,0.08):
            fr=f(m)*(1+det/100)
            s+=np.sin(2*np.pi*fr*t)+0.3*np.sin(2*np.pi*2*fr*t)
    s*=env(len(t),0.6,0.8)*(0.75+0.25*np.sin(2*np.pi*t/ (bar)))
    pads.append(s/len(ch)/4)
pos=0;i=0
while pos<N:
    p=pads[i%4]; n=min(len(p),N-pos); mix[pos:pos+n]+=0.5*p[:n]; pos+=len(p); i+=1
# bajo
pos=0;i=0
while pos<N:
    root=chords[(i//8)%4][0]-12
    tt=np.arange(int(beat*sr))/sr
    b=np.sin(2*np.pi*f(root)*tt)*np.exp(-tt*3)
    n=min(len(b),N-pos); mix[pos:pos+n]+=0.35*b[:n]; pos+=int(beat*sr); i+=1
# kick + hat
kt=np.arange(int(0.35*sr))/sr
kick=np.sin(2*np.pi*(45+90*np.exp(-kt*25))*kt)*np.exp(-kt*9)
hat=rng.standard_normal(int(0.05*sr)); hat=np.diff(hat,prepend=0)*np.exp(-np.arange(len(hat))/sr*90)
k=0
while True:
    p=int(k*beat*sr)
    if p+len(kick)>=N: break
    if k>=4: mix[p:p+len(kick)]+=0.45*kick
    q=int((k+0.5)*beat*sr)
    if k>=4 and q+len(hat)<N: mix[q:q+len(hat)]+=0.06*hat
    k+=1
mix=lp(mix,0.35)
mix*=env(N,1.5,2.5)
mix/=np.max(np.abs(mix))*1.05
sf.write("public/musica.wav",mix.astype(np.float32),sr)
# whoosh
n=int(0.5*sr); w=rng.standard_normal(n); tt=np.arange(n)/sr
w=lp(w,0.08)*np.sin(np.pi*tt/0.5)**2; w/=np.max(np.abs(w))
sf.write("public/whoosh.wav",(0.8*w).astype(np.float32),sr)
# pop
n=int(0.12*sr); tt=np.arange(n)/sr
pop=np.sin(2*np.pi*(900-500*tt/0.12)*tt)*np.exp(-tt*40)
sf.write("public/pop.wav",(0.7*pop).astype(np.float32),sr)
# click (tecla)
n=int(0.03*sr); c=rng.standard_normal(n)*np.exp(-np.arange(n)/sr*300)
sf.write("public/click.wav",(0.4*c).astype(np.float32),sr)
print("ok")
